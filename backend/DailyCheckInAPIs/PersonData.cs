using System;
using Newtonsoft.Json;

namespace DailyCheckInAPIs
{
    public class PersonData
    {
        [JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public String PatientId { get; set; }
        public String zipcode { get; set; }
        public String Age { get; set; }
        public String Gender { get; set; }
        public String Country { get; set; }
        public String EntryDate { get; set; }
        public String Date_symptom_onset { get; set; }
        public String Date_of_last_test { get; set; }
        //Yes, No variables
        public String external_travel { get; set; }
        public String covid_contact_ques { get; set; }
        public String Flu_Vaccine { get; set; }
        public String Diabetic { get; set; }
        public String Cancer_history { get; set; }
        public String Pregnant { get; set; }

    }
}
