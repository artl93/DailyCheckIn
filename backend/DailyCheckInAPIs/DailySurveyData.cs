using System;
using Newtonsoft.Json;

namespace DailyCheckInAPIs
{
    // Class to store daily survey data points for a user collected from DCI Mobile App
    public class DailySurveyData
    {
        [JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public String PatientId { get; set; }   
        [JsonProperty(PropertyName = "entrydate")]
        public String EntryDate { get; set; }      
        public String GeneralFeeling { get; set; }
        public String Fever_Y_N { get; set; }
        public String Fever_Rating { get; set; }
        public String HighestTemperature { get; set; }
        public String Cough_Y_N { get; set; }
        public String Cough_Rating { get; set; }       
        public String BodyAches_Y_N { get; set; }
        public String BodyAches_Rating { get; set; }
        public String ShortnessOfBreath_Y_N { get; set; }
        public String ShortnessOfBreath_Rating { get; set; }
        public String SoreThroat_Y_N { get; set; }
        public String SoreThroat_Rating { get; set; }
        public String Tired_Y_N { get; set; }
        public String Tired_Rating { get; set; }
        public String Chills_Y_N { get; set; }
        public String Chills_Rating { get; set; }
        public String RunnyOrStuffyNose_Y_N { get; set; }
        public String RunnyOrStuffyNose_Rating { get; set; }
        public String NauseaOrVomiting_Y_N { get; set; }
        public String NauseaOrVomiting_Rating { get; set; }
        public String AbdominalPain_Y_N { get; set; }
        public String AbdominalPain_Rating { get; set; }
        public String Diarrhea_Y_N { get; set; }
        public String Diarrhea_Rating { get; set; }
        public String DiarrheaEpisodes { get; set; }
        public String LostSmellTasteSense_Y_N { get; set; }
        public String LostSmellTasteSense_Rating { get; set; }
        public String Headache_Y_N { get; set; }
        public String Headache_Rating { get; set; }
        public String Other { get; set; }
    }
}