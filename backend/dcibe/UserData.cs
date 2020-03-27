using System;

namespace dcibe
{
    // Class to store data-points for a user collected from DCI Mobile App
    public class UserData
    {
        public string Email { get; set; }
        public string Cough { get; set; }
        public string Fever { get; set; }
        public string Feeling { get; set; }
        public string ShortnessOfBreath { get; set; }
        public string Tiredness { get; set; }
        public string SoreThroat { get; set; }
        public string Contact { get; set; }
        public string CountryVisited { get; set; }
    }
}