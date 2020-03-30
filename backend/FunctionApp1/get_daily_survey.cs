using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;

namespace FunctionApp1
{
    public static class get_daily_survey
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

        [FunctionName("get_daily_survey")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string patientId = req.Query["PatientId"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            patientId = patientId ?? data?.PatientId;

            string responseMessage;
            
            if (string.IsNullOrEmpty(patientId))
            {
                responseMessage = "Pass a PatientId in the query string or in the request body for a personalized response.";
                return new NotFoundObjectResult(responseMessage);
            }
            else 
            {
                List<DailySurveyData> dailySurveyDataPoints = await get_daily_survey.ReadFromCosmosDB(patientId);

                if (dailySurveyDataPoints.Count == 0)
                {
                    responseMessage = "Could not find PatientId";
                    return new NotFoundObjectResult(responseMessage);
                }

                responseMessage = JsonConvert.SerializeObject(dailySurveyDataPoints);
                return new OkObjectResult(responseMessage);
            }
        }

        // Utility method to write user data to Cosmos Database
        private static async Task<List<DailySurveyData>> ReadFromCosmosDB(string patientId) 
        {
            // Create a new instance of the Cosmos Client
            get_daily_survey.cosmosClient = new CosmosClient(EndpointUri, PrimaryKey, new CosmosClientOptions() { ApplicationName = "CosmosDBDotnetQuickstart" });
            await get_daily_survey.CreateDatabaseAsync();
            await get_daily_survey.CreateContainerAsync();
            await get_daily_survey.ScaleContainerAsync();

            List<DailySurveyData> dailySurveyDataPoints = await get_daily_survey.QueryItemsAsync(patientId);
            return dailySurveyDataPoints;
        }

        // Create the database if it doesn't exist
        private static async Task CreateDatabaseAsync()
        {
            // Create a new database
            get_daily_survey.database = await get_daily_survey.cosmosClient.CreateDatabaseIfNotExistsAsync(get_daily_survey.databaseName);
            Console.WriteLine("Created Database: {0}\n", get_daily_survey.database.Id);
        }

        /// Create the container if it does not exist. 
        private static async Task CreateContainerAsync()
        {
            // Create a new container
            get_daily_survey.container = await get_daily_survey.database.CreateContainerIfNotExistsAsync(get_daily_survey.containerName, "/entrydate", 400);
            Console.WriteLine("Created Container: {0}\n", get_daily_survey.container.Id);
        }

        /// Scale the throughput provisioned on an existing Container.
        /// You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
        private static async Task ScaleContainerAsync()
        {
            // Read the current throughput
            int? throughput = await get_daily_survey.container.ReadThroughputAsync();
            if (throughput.HasValue)
            {
                Console.WriteLine("Current provisioned throughput : {0}\n", throughput.Value);
                int newThroughput = throughput.Value + 100;
                // Update throughput
                await get_daily_survey.container.ReplaceThroughputAsync(newThroughput);
                Console.WriteLine("New provisioned throughput : {0}\n", newThroughput);
            }            
        }

        /// Query Item in an existing Container.
        private static async Task<List<DailySurveyData>> QueryItemsAsync(String patientId)
        {
            QueryDefinition queryDefinition = new QueryDefinition("SELECT * FROM dailysurvey WHERE dailysurvey.PatientId = @ZipInput").WithParameter("@ZipInput", patientId);
            FeedIterator<DailySurveyData> queryResultSetIterator = container.GetItemQueryIterator<DailySurveyData>(queryDefinition);

            List<DailySurveyData> dailySurveyDataPoints = new List<DailySurveyData>();

            while (queryResultSetIterator.HasMoreResults)
            {
                try
                {
                    FeedResponse<DailySurveyData> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (DailySurveyData dailySurveyData in currentResultSet)
                    {
                        dailySurveyDataPoints.Add(dailySurveyData);

                        Console.WriteLine("\tRead entryDate - {0}\n", dailySurveyData.EntryDate);
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception is ", e.StackTrace);
                    return dailySurveyDataPoints;
                }                
            }

            return dailySurveyDataPoints;
        }
    }
}
