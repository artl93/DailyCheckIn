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

    public static class get_initial_assessment
    {

        static CosmosClient cosmosClient;
        static Database database;
        static Container container;

        static string EndpointUrl = Environment.GetEnvironmentVariable("COSMOS_ENDPOINT");
        static string PrimaryKey = Environment.GetEnvironmentVariable("PKEY");

        static string databaseId = "coronafear";
        static string containerId = "firstassess";

        static string responseMessage = "";

        [FunctionName("get_initial_assessment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            cosmosClient = new CosmosClient(EndpointUrl, PrimaryKey);
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["PatientID"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            // Input user data to SQL DB
            await get_initial_assessment.queryFromFirstAssess(name);

            return new OkObjectResult(responseMessage);
        }

        private static async Task queryFromFirstAssess(String userData)
        {

            // Create a new instance of the Cosmos Client
            
            await CreateDatabaseAsync();
            await CreateContainerAsync();
            //await this.AddItemsToContainerAsync();
            await QueryItemsAsync(userData);

        }

        private static async Task CreateDatabaseAsync()
        {
            // Create a new database
            database = await cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
            Console.WriteLine("Created Database: {0}\n", database.Id);
        }

        private static async Task CreateContainerAsync()
        {
            // Create a new container
            container = await database.CreateContainerIfNotExistsAsync(containerId, "/zipcode");
            Console.WriteLine("Created Container: {0}\n", container.Id);
        }

        private static async Task QueryItemsAsync(String param)
        {
            QueryDefinition queryDefinition = new QueryDefinition("SELECT * FROM firstassess WHERE firstassess.PatientId = @ZipInput").WithParameter("@ZipInput", param);
            FeedIterator<FirstAssess> queryResultSetIterator = container.GetItemQueryIterator<FirstAssess>(queryDefinition);

            List<FirstAssess> families = new List<FirstAssess>();

            while (queryResultSetIterator.HasMoreResults)
            {
                try
                {
                    FeedResponse<FirstAssess> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                    foreach (FirstAssess family in currentResultSet)
                    {
                        families.Add(family);

                        Console.WriteLine("\tRead {0}\n", family.Age);
                    }
                    var json = JsonConvert.SerializeObject(families);
                    responseMessage = json;

                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception is ", e.StackTrace);
                }
            }
        }
    }
}
