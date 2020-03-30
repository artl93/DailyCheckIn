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

namespace DailyCheckInAPIs
{
    public static class upsert_person
    {

        static CosmosClient cosmosClient;
        static Database database;
        static Container container;

        static string EndpointUrl = Environment.GetEnvironmentVariable("COSMOS_ENDPOINT");
        static string PrimaryKey = Environment.GetEnvironmentVariable("PKEY");

        static string databaseId = "coronafear";
        static string containerId = "firstassess";

        static string responseMessage = "";

        [FunctionName("upsert_person")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            cosmosClient = new CosmosClient(EndpointUrl, PrimaryKey);
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            PersonData data = JsonConvert.DeserializeObject<PersonData>(requestBody);
                        
            // Input user data to SQL DB
            await upsert_person.queryFromFirstAssess(data);
            responseMessage = "Insert into First Assessment table successful";
            return new OkObjectResult(responseMessage);
        }

        private static async Task queryFromFirstAssess(PersonData userData)
        {

            // Create a new instance of the Cosmos Client

            await CreateDatabaseAsync();
            await CreateContainerAsync();
            await AddItemsToContainerAsync(userData);
            //await QueryItemsAsync(userData);

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

        private static async Task AddItemsToContainerAsync(PersonData data)
        {
            ItemResponse<PersonData> assessResponse = null;

            // Create a family object for the Andersen family
            PersonData assess = new PersonData
            {
                Id = Guid.NewGuid().ToString(),
                PatientId = data.PatientId,
                Pregnant = data.Pregnant,
                EntryDate = data.EntryDate,
                zipcode = data.zipcode,
                Country = data.Country,
                Age = data.Age,
                Gender = data.Gender,
                external_travel = data.external_travel,
                covid_contact_ques = data.covid_contact_ques,
                Flu_Vaccine = data.Flu_Vaccine,
                Diabetic = data.Diabetic,
                Cancer_history = data.Cancer_history
            };

            try
            {
                // Create an item in the container representing the Andersen family. Note we provide the value of the partition key for this item, which is "Andersen".
                assessResponse = await container.CreateItemAsync<PersonData>(assess, new PartitionKey(assess.zipcode));
                // Note that after creating the item, we can access the body of the item with the Resource property of the ItemResponse. We can also access the RequestCharge property to see the amount of RUs consumed on this request.
                Console.WriteLine("Created item in database with id: {0} Operation consumed {1} RUs.\n", assessResponse.Resource.Id, assessResponse.RequestCharge);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.Conflict)
            {
                Console.WriteLine("Item in database with id: {0} already exists\n", assess.Id);
            }
        }
    }
}

