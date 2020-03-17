const insert_api = 'https://dciberjs.azurewebsites.net/api/insert?code=66vOqKaAhEdsocLSMzrhsxCEGn3nxB7YQgrw3kUSxbdxcx47MnaDBw=='

// local
// const insert_api = 'http://localhost:7071/api/insert/'

const headers = {
  'Accept': 'application/json'
}

export const insert = (userData) => {
    return fetch(`${insert_api}&email=${userData.email}&fever=${userData.fever}&cough=${userData.cough}`, 
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
