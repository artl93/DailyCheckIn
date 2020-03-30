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
using DailySurveyData;

namespace FunctionApp1
{
    public static class upsert_daily_survey
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
        [FunctionName("upsert_daily_survey")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("upsert_daily_survey function processed a request.");

            DailySurveyData dailySurveyData = await upsert_daily_survey.PopulateDailySurveyDataFromHttpRequest(req);
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
                await upsert_daily_survey.WriteToCosmosDB(dailySurveyData);                
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

            return dailySurveyData;
        }

        // Utility method to write user data to Cosmos Database
        private static async Task WriteToCosmosDB(DailySurveyData dailySurveyData) 
        {
            // Create a new instance of the Cosmos Client
            upsert_daily_survey.cosmosClient = new CosmosClient(EndpointUri, PrimaryKey, new CosmosClientOptions() { ApplicationName = "CosmosDBDotnetQuickstart" });
            await upsert_daily_survey.CreateDatabaseAsync();
            await upsert_daily_survey.CreateContainerAsync();
            await upsert_daily_survey.ScaleContainerAsync();
            await upsert_daily_survey.AddItemsToContainerAsync(dailySurveyData);
        }

        // Create the database if it doesn't exist
        private static async Task CreateDatabaseAsync()
        {
            // Create a new database
            upsert_daily_survey.database = await upsert_daily_survey.cosmosClient.CreateDatabaseIfNotExistsAsync(upsert_daily_survey.databaseName);
            Console.WriteLine("Created Database: {0}\n", upsert_daily_survey.database.Id);
        }

        /// Create the container if it does not exist. 
        private static async Task CreateContainerAsync()
        {
            // Create a new container
            upsert_daily_survey.container = await upsert_daily_survey.database.CreateContainerIfNotExistsAsync(upsert_daily_survey.containerName, "/entrydate", 400);
            Console.WriteLine("Created Container: {0}\n", upsert_daily_survey.container.Id);
        }

        /// Scale the throughput provisioned on an existing Container.
        /// You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
        private static async Task ScaleContainerAsync()
        {
            // Read the current throughput
            int? throughput = await upsert_daily_survey.container.ReadThroughputAsync();
            if (throughput.HasValue)
            {
                Console.WriteLine("Current provisioned throughput : {0}\n", throughput.Value);
                int newThroughput = throughput.Value + 100;
                // Update throughput
                await upsert_daily_survey.container.ReplaceThroughputAsync(newThroughput);
                Console.WriteLine("New provisioned throughput : {0}\n", newThroughput);
            }
            
        }

        /// Add initial assessment items to the container
        private static async Task AddItemsToContainerAsync(DailySurveyData dailySurveyData)
        {            
            try
            {
                // Create an item in the container representing the user data. Note we provide the value of the partition key for upsert_daily_survey item, which is "Andersen"
                ItemResponse<DailySurveyData> dailySurveyDataResponse = await upsert_daily_survey.container.CreateItemAsync<DailySurveyData>(dailySurveyData, new PartitionKey(dailySurveyData.EntryDate));

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
