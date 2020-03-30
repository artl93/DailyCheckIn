using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;


namespace DailyCheckInAPIs
{
    public static class insert_daily
    {
        // The Azure Cosmos DB endpoint for running this sample.
        private static readonly string EndpointUri = Environment.GetEnvironmentVariable("COSMOS_ENDPOINT");

        // The primary key for the Azure Cosmos account.
        private static readonly string PrimaryKey = Environment.GetEnvironmentVariable("PKEY");

        // The Cosmos client instance
        private static CosmosClient cosmosClient;

        // The database we will create
        private static Database database;

        // The container we will create.
        private static Container container;

        // The name of the database and container we will create
        private static string databaseName = "coronafear";
        private static string containerName = "dailysurvey";

        // Azure function triggered when user submits his/her data via DCI Mobile App
        [FunctionName("insert_daily")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("insert_daily function processed a request.");

            DailySurveyData dailySurveyData = await insert_daily.PopulateDailySurveyDataFromHttpRequest(req);
            dailySurveyData.EntryDate = DateTime.Today.Date.ToString();
            
            string responseMessage = "";
            
            if (string.IsNullOrEmpty(dailySurveyData.PatientId)) 
            {
                responseMessage = "{\"result\":\"PatientId parameter is missing in your request\"}";
                return new OkObjectResult(responseMessage);
            } 
            else 
            {
                // Input user data to Cosmos DB
                await insert_daily.WriteToCosmosDB(dailySurveyData);                
                responseMessage = "{\"result\":\"wrote " + 1 + " record(s) to db\"}";               
                    return new OkObjectResult(responseMessage);
            }           
        }

        // Utility method to extract daily survey data from HTTP request query params or request body
        private static async Task<DailySurveyData> PopulateDailySurveyDataFromHttpRequest(HttpRequest request) 
        {

            // Reading request body
            string requestBody = await new StreamReader(request.Body).ReadToEndAsync();
            DailySurveyData dailySurveyData = JsonConvert.DeserializeObject<DailySurveyData>(requestBody);

            // add time stamp
            dailySurveyData.Id = Guid.NewGuid().ToString();
            dailySurveyData.EntryDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ssffff");

            Console.WriteLine("\n\nMy surveyData");
            Console.WriteLine(dailySurveyData.ToString());

            return dailySurveyData;
        }

        // Utility method to write user data to Cosmos Database
        private static async Task WriteToCosmosDB(DailySurveyData dailySurveyData) 
        {
            // Create a new instance of the Cosmos Client
            insert_daily.cosmosClient = new CosmosClient(EndpointUri, PrimaryKey, new CosmosClientOptions() { ApplicationName = "CosmosDBDotnetQuickstart" });
            await insert_daily.CreateDatabaseAsync();
            await insert_daily.CreateContainerAsync();
            await insert_daily.ScaleContainerAsync();
            await insert_daily.AddItemsToContainerAsync(dailySurveyData);
        }

        // Create the database if it doesn't exist
        private static async Task CreateDatabaseAsync()
        {
            // Create a new database
            insert_daily.database = await insert_daily.cosmosClient.CreateDatabaseIfNotExistsAsync(insert_daily.databaseName);
            Console.WriteLine("Created Database: {0}\n", insert_daily.database.Id);
        }

        /// Create the container if it does not exist. 
        private static async Task CreateContainerAsync()
        {
            // Create a new container
            insert_daily.container = await insert_daily.database.CreateContainerIfNotExistsAsync(insert_daily.containerName, "/entrydate", 400);
            Console.WriteLine("Created Container: {0}\n", insert_daily.container.Id);
        }

        /// Scale the throughput provisioned on an existing Container.
        /// You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
        private static async Task ScaleContainerAsync()
        {
            // Read the current throughput
            int? throughput = await insert_daily.container.ReadThroughputAsync();
            if (throughput.HasValue)
            {
                Console.WriteLine("Current provisioned throughput : {0}\n", throughput.Value);
                int newThroughput = throughput.Value + 100;
                // Update throughput
                await insert_daily.container.ReplaceThroughputAsync(newThroughput);
                Console.WriteLine("New provisioned throughput : {0}\n", newThroughput);
            }
            
        }

        /// Add initial assessment items to the container
        private static async Task AddItemsToContainerAsync(DailySurveyData dailySurveyData)
        {            
            try
            {
                // Create an item in the container representing the user data. Note we provide the value of the partition key for upsert_daily_survey item, which is "Andersen"
                ItemResponse<DailySurveyData> dailySurveyDataResponse = await insert_daily.container.CreateItemAsync<DailySurveyData>(dailySurveyData, new PartitionKey(dailySurveyData.EntryDate));

                // Note that after creating the item, we can access the body of the item with the Resource property off the ItemResponse. We can also access the RequestCharge property to see the amount of RUs consumed on this request.
                Console.WriteLine("Created item in database with id: {0} Operation consumed {1} RUs.\n", dailySurveyDataResponse.Resource.Id, dailySurveyDataResponse.RequestCharge);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.Conflict)
            {
                Console.WriteLine("Item in database with id: {0} already exists\n", dailySurveyData.Id);
            }
        }
    }
}
