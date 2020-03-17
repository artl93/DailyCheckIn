using System;
using System.IO;
using System.Net;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;



namespace dcidb
{
    public static class insert
    {
        [FunctionName("insert")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string email = req.Query["email"];
            string cough = req.Query["cough"];
            string fever = req.Query["fever"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            email = email ?? data?.email;
            fever = fever ?? data?.fever;
            cough = cough ?? data?.cough;

            string responseMessage = "";
            
            if (string.IsNullOrEmpty(email)) {
                responseMessage = "{\"result\":\"email parameter missing in your request\"}";
                return new OkObjectResult(responseMessage);

            } else {

                if (string.IsNullOrEmpty(fever))
                    fever = "0";

                if (string.IsNullOrEmpty(cough))
                    cough = "0";

                int writeResult = WriteToDB(email,fever,cough);
                
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


        public static int WriteToDB( string email, string fever, string cough ) {
            
            string cnnString  = Environment.GetEnvironmentVariable("DB_CONNECTION");

            Console.WriteLine(cnnString);
            
            using(SqlConnection connection = new SqlConnection(cnnString))
            {
                String query = "insert into user_measures (email,ci_time,fever, cough) values (@email, CURRENT_TIMESTAMP, @fever, @cough )";

                using(SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", email);
                    command.Parameters.AddWithValue("@fever", fever);
                    command.Parameters.AddWithValue("@cough", cough);

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
