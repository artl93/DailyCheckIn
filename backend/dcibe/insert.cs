using System;
using System.IO;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace dcibe
{
    public static class insert
    {
        // Azure function triggered when user submits his/her data via DCI Mobile App
        [FunctionName("insert")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("insert function processed a request.");

            // Reading user data from query parameters
            string email = req.Query["email"];
            string cough = req.Query["cough"];
            string fever = req.Query["fever"];
            string feeling = req.Query["feeling"];
            string shortnessOfBreath = req.Query["shortnessOfBreath"];
            string tiredness = req.Query["tiredness"];
            string soreThroat= req.Query["soreThroat"];
            string contact = req.Query["contact"];
            string countryVisited = req.Query["countryVisited"];

            // Reading request body
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            UserData userData = new UserData();
            userData.Email = email ?? data?.email;
            userData.Fever = fever ?? data?.fever;
            userData.Cough = cough ?? data?.cough;
            userData.Feeling = feeling ?? data?.feeling;
            userData.ShortnessOfBreath = shortnessOfBreath ?? data?.shortnessOfBreath;
            userData.Tiredness = tiredness ?? data?.tiredness;
            userData.SoreThroat = soreThroat ?? data?.soreThroat;
            userData.Contact = contact ?? data?.contact;
            userData.CountryVisited = countryVisited ?? data?.countryVisited;

            string responseMessage = "";
            
            if (string.IsNullOrEmpty(email)) {
                responseMessage = "{\"result\":\"email parameter missing in your request\"}";
                return new OkObjectResult(responseMessage);

            } else {

                if (string.IsNullOrEmpty(fever))
                    fever = "0";

                if (string.IsNullOrEmpty(cough))
                    cough = "0";

                // Input user data to SQL DB
                int writeResult = insert.WriteToDB(userData);
                
                if (writeResult >= 0) {
                    responseMessage = "{\"result\":\"wrote " + writeResult + " record(s) to db\"}";
                    return new OkObjectResult(responseMessage);
                }
                else {
                    responseMessage = "{\"result\":\"error # " + writeResult + " when uploading data\"}";
                    return new OkObjectResult(responseMessage);
                }
            }

            
        }


        // Utility method to write user data to SQL Database
        private static int WriteToDB( UserData userData) {
            
            string cnnString  = Environment.GetEnvironmentVariable("DB_CONNECTION");

            Console.WriteLine(cnnString);
            
            using(SqlConnection connection = new SqlConnection(cnnString))
            {
                // to add
                String query = "insert into user_measures " + 
                                "(email, ci_time, fever, cough, feeling, shortness_of_breath, tiredness, sore_throat, contact, country_visited) " +
                                "values (@email, CURRENT_TIMESTAMP, @fever, @cough, @feeling, @shortnessOfBreath, @tiredness, @soreThroat, @contact, @countryVisited)";

                using(SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", userData.Email);
                    command.Parameters.AddWithValue("@cough", userData.Cough);
                    command.Parameters.AddWithValue("@fever", userData.Fever);
                    command.Parameters.AddWithValue("@feeling", userData.Feeling);
                    command.Parameters.AddWithValue("@shortnessOfBreath", userData.ShortnessOfBreath);
                    command.Parameters.AddWithValue("@tiredness",userData.Tiredness);
                    command.Parameters.AddWithValue("@soreThroat",userData.SoreThroat);
                    command.Parameters.AddWithValue("@contact",userData.Contact);
                    command.Parameters.AddWithValue("@countryVisited",userData.CountryVisited);

                    connection.Open();
                    int result = command.ExecuteNonQuery();

                    // Check Error
                    if(result < 0) 
                        Console.WriteLine("Error inserting data into Database!");
                    
                    return result;

                }
            }       

        }
    }
}
