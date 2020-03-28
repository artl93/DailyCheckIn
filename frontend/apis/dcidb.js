const insert_api = 'https://dciberjs.azurewebsites.net/api/insert?code=66vOqKaAhEdsocLSMzrhsxCEGn3nxB7YQgrw3kUSxbdxcx47MnaDBw=='

// local
// const insert_api = 'http://localhost:7071/api/insert/'

const headers = {
  'Accept': 'application/json'
}

export const insert = (userData) => {

    let params = ''


    if (userData.feelingRating != null)
      params += `&feelingRating=${userdata.feelingRating}`

    if (userData.feverChillsRating != null)
      params += `&feverChillsRating=${userdata.feverChillsRating}`

    if (userData.temperature != null)
      params += `&temperature=${userdata.temperature}`

    if (userData.coughRating != null)
      params += `&coughRating=${userdata.coughRating}`

    if (userData.soreThroatRating != null)
      params += `&soreThroatRating=${userdata.soreThroatRating}`

    if (userData.fatigueRating != null)
      params += `&fatigueRating=${userdata.fatigueRating}`

    if (userData.nauseaRating != null)
      params += `&nauseaRating=${userdata.nauseaRating}`

    if (userData.abdominalPainRating != null)
      params += `&abdominalPainRating=${userdata.abdominalPainRatin}`

    if (userData.diarrheaRating != null)
      params += `&diarrheaRating=${userdata.diarrheaRating}`


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
