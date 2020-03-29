const insert_api = 'https://dciberjs.azurewebsites.net/api/insert?code=66vOqKaAhEdsocLSMzrhsxCEGn3nxB7YQgrw3kUSxbdxcx47MnaDBw=='

// local
// const insert_api = 'http://localhost:7071/api/insert/'

const headers = {
  'Accept': 'application/json'
}

export const insert = (userData) => {

    let params = ''


    if (userData.feelingRating !== null)
      params += `&feelingRating=${userData.feelingRating}`

    if (userData.feverChillsRating !== null)
      params += `&feverChillsRating=${userData.feverChillsRating}`

    if (userData.temperature !== null)
      params += `&temperature=${userData.temperature}`

    if (userData.coughRating !== null)
      params += `&coughRating=${userData.coughRating}`

    if (userData.shortnessOfBreathRating !== null)
      params += `&shortnessOfBreathRating=${userData.shortnessOfBreathRating}`

    if (userData.soreThroatRating !== null)
      params += `&soreThroatRating=${userData.soreThroatRating}`

    if (userData.fatigueRating !== null)
      params += `&fatigueRating=${userData.fatigueRating}`

    if (userData.nauseaRating !== null)
      params += `&nauseaRating=${userData.nauseaRating}`

    if (userData.abdominalPainRating !== null)
      params += `&abdominalPainRating=${userData.abdominalPainRatin}`

    if (userData.diarrheaRating !== null)
      params += `&diarrheaRating=${userData.diarrheaRating}`


    return fetch(`${insert_api}${params}`, 
    { headers, method: 'POST' }) 
    .then( (res) =>{
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
