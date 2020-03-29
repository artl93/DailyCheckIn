const insert_api = 'https://dciberjs.azurewebsites.net/api/insert?code=66vOqKaAhEdsocLSMzrhsxCEGn3nxB7YQgrw3kUSxbdxcx47MnaDBw=='

// local
// const insert_api = 'http://localhost:7071/api/insert/'

const headers = {
  'Accept': 'application/json'
}

export const insert = (userData) => {

    let params = ''

    if (userData.email !== null)
      params += `&email=${userData.email}`

    if (userData.feelingRating !== null)
      params += `&feeling=${userData.feelingRating}`

    if (userData.feverChillsRating !== null)
      params += `&fever=${userData.feverChillsRating}`

    if (userData.temperature !== null)
      params += `&temperature=${userData.temperature}`

    if (userData.coughRating !== null)
      params += `&cough=${userData.coughRating}`

    if (userData.shortnessOfBreathRating !== null)
      params += `&shortnessOfBreath=${userData.shortnessOfBreathRating}`

    if (userData.soreThroatRating !== null)
      params += `&soreThroat=${userData.soreThroatRating}`

    if (userData.fatigueRating !== null)
      params += `&fatigue=${userData.fatigueRating}`

    if (userData.nauseaRating !== null)
      params += `&nausea=${userData.nauseaRating}`

    if (userData.abdominalPainRating !== null)
      params += `&abdominalPain=${userData.abdominalPainRatin}`

    if (userData.diarrheaRating !== null)
      params += `&diarrhea=${userData.diarrheaRating}`


    return fetch(`${insert_api}${params}`, 
    { headers, method: 'POST' }) 
    .then( (res) =>{
        if (res.status !== 200) {
          return `{"error":"${res.status} - ${res.statusText}"}`
        } else
          return res.json()
    })
    .then( (data) => {
      return JSON.parse(data)
    })
    .catch(error => { 
      const emsg = typeof error !== 'undefined' ? error.message : 'undefined error'
      console.log('update failed', emsg) 
      return {error: emsg}
    });
}
