using System;
using System.IO;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Configuration;
using System.Net;

namespace dcibe
{
    public static class insert
    {
        // The Azure Cosmos DB endpoint for running this sample.
        private static readonly string EndpointUri = ConfigurationManager.AppSettings["EndPointUri"];

        // The primary key for the Azure Cosmos account.
        private static readonly string PrimaryKey = ConfigurationManager.AppSettings["PrimaryKey"];

        // The Cosmos client instance
        private static CosmosClient cosmosClient;

        // The database we will create
        private static Database database;

        // The container we will create.
        private static Container container;

        // The name of the database and container we will create
        private static string databaseName = "coronafear";
        private static string containerName = "firstassess";

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
                // int writeResult = insert.WriteToSQLDB(userData);

                await insert.WriteToCosmosDB(userData);                
                responseMessage = "{\"result\":\"wrote " + 1 + " record(s) to db\"}";               
                    return new OkObjectResult(responseMessage);
                    
                /*
                if (writeResult >= 0) {
                    responseMessage = "{\"result\":\"wrote " + writeResult + " record(s) to db\"}";
                    return new OkObjectResult(responseMessage);
                }
                else {
                    responseMessage = "{\"result\":\"error # " + writeResult + " when uploading data\"}";
                    return new OkObjectResult(responseMessage);
                } */
            }           
        }


        // Utility method to write user data to SQL Database
        private static int WriteToSQLDB( UserData userData) 
        {            
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

        // Utility method to write user data to Cosmos Database
        private static async Task WriteToCosmosDB(UserData userData) 
        {
            // Create a new instance of the Cosmos Client
            insert.cosmosClient = new CosmosClient(EndpointUri, PrimaryKey, new CosmosClientOptions() { ApplicationName = "CosmosDBDotnetQuickstart" });
            await insert.CreateDatabaseAsync();
            await insert.CreateContainerAsync();
            await insert.ScaleContainerAsync();
            await insert.AddItemsToContainerAsync(userData);
        }

        // <CreateDatabaseAsync>
        private static async Task CreateDatabaseAsync()
        {
            // Create a new database
            insert.database = await insert.cosmosClient.CreateDatabaseIfNotExistsAsync(insert.databaseName);
            Console.WriteLine("Created Database: {0}\n", insert.database.Id);
        }

        /// Create the container if it does not exist. 
        private static async Task CreateContainerAsync()
        {
            // Create a new container
            insert.container = await insert.database.CreateContainerIfNotExistsAsync(insert.containerName, "/LastName", 400);
            Console.WriteLine("Created Container: {0}\n", insert.container.Id);
        }

        /// Scale the throughput provisioned on an existing Container.
        /// You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
        private static async Task ScaleContainerAsync()
        {
            // Read the current throughput
            int? throughput = await insert.container.ReadThroughputAsync();
            if (throughput.HasValue)
            {
                Console.WriteLine("Current provisioned throughput : {0}\n", throughput.Value);
                int newThroughput = throughput.Value + 100;
                // Update throughput
                await insert.container.ReplaceThroughputAsync(newThroughput);
                Console.WriteLine("New provisioned throughput : {0}\n", newThroughput);
            }
            
        }

        /// Add initial assessment items to the container
        private static async Task AddItemsToContainerAsync(UserData userData)
        {
            try
            {
                // Read the item to see if it exists.  
                ItemResponse<UserData> userDataResponse = await insert.container.ReadItemAsync<UserData>(userData.Email, new PartitionKey(userData.Email));
                Console.WriteLine("Item in database with id: {0} already exists\n", userData.Email);
            }
            catch(CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                // Create an item in the container representing the user data. Note we provide the value of the partition key for insert item, which is "Andersen"
                ItemResponse<UserData> userDataResponse = await insert.container.CreateItemAsync<UserData>(userData, new PartitionKey(userData.Email));

                // Note that after creating the item, we can access the body of the item with the Resource property off the ItemResponse. We can also access the RequestCharge property to see the amount of RUs consumed on this request.
                //Console.WriteLine("Created item in database with id: {0} Operation consumed {1} RUs.\n", andersenFamilyResponse.Resource.Id, andersenFamilyResponse.RequestCharge);
            }
        }
    }
}
