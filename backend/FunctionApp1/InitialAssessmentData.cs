using System;
using Newtonsoft.Json;

namespace FunctionApp1
{
    public class InitialAssessmentData
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
        public String Fever { get; set; }
        public String Cough { get; set; }
        public String Muscle_body_ache { get; set; }
        public String Sore_throat { get; set; }
        public String Fatigue { get; set; }
        public String Chills { get; set; }
        public String Runny_nose { get; set; }
        public String Nausea { get; set; }
        public String Headache { get; set; }
        public String Abdominal_pain { get; set; }
        public String Diarrhea { get; set; }
        public String Anosmia { get; set; }
        public String Results_of_test { get; set; }
        public String Tested_previously { get; set; }

    }
}
