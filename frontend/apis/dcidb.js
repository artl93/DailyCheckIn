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

    if (userData.fever !== null)
      params += `&fever=${userData.fever}`

    if (userData.cough !== null)
      params += `&cough=${userData.cough}`     

    if (userData.feeling !== null)
      params += `&feeling=${userData.feeling}` 

    if (userData.shortnessOfBreath !== null)
      params += `&shortnessOfBreath=${userData.shortnessOfBreath}`

    if (userData.tiredness !== null)
      params += `&tiredness=${userData.tiredness}`     

    if (userData.soreThroat !== null)
      params += `&soreThroat=${userData.soreThroat}`  

    if (userData.contact !== null)
      params += `&contact=${userData.contact}` 

    if (userData.countryVisited !== null)
      params += `&countryVisited=${userData.countryVisited}`    

    return fetch(`${insert_api}${params}`, 
    { headers, method: 'POST' }) 
    .then( (res) =>{
        return res.json()
    })
    .then( (data) => {
      return JSON.parse(data)
    })
    .catch(error => { 
      console.log('update failed', error) 
    });
}
