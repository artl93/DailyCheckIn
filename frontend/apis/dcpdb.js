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
      params += `&location=${userData.location}`

    if (userData.feverChillsRating !== null)
      params += `&ageGroup=${userData.ageGroup}`

    if (userData.temperature !== null)
      params += `&diabetes=${userData.diabetes}`

    if (userData.coughRating !== null)
      params += `&cancer=${userData.cancer}`

    if (userData.shortnessOfBreathRating !== null)
      params += `&gender=${userData.gender}`

    if (userData.soreThroatRating !== null)
      params += `&pregnancy=${userData.pregnancy}`

    if (userData.fatigueRating !== null)
      params += `&asthma=${userData.asthma}`

    if (userData.nauseaRating !== null)
      params += `&heartKidneyOrLiver=${userData.heartKidneyOrLiver}`

    if (userData.abdominalPainRating !== null)
      params += `&weakImune=${userData.weakImune}`

    if (userData.diarrheaRating !== null)
      params += `&traveled=${userData.traveled}`

    if (userData.diarrheaRating !== null)
      params += `&contact=${userData.contact}`

    if (userData.diarrheaRating !== null)
      params += `&fluVaccine=${userData.fluVaccine}`   

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
