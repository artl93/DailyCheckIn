//const insert_api = 'https://dciberjs.azurewebsites.net/api/insert?code=66vOqKaAhEdsocLSMzrhsxCEGn3nxB7YQgrw3kUSxbdxcx47MnaDBw=='
// local
const insert_api = 'http://192.168.0.15:7071/api/insert_daily?mykey=123'


const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export const insert = (userData) => {

    let params = ''  

    return fetch(`${insert_api}${params}`, 
    { headers, method: 'POST', body: JSON.stringify(userData) }) 
    .then( (res) =>{
        if (res.status !== 200) {
          return `{"error":"${res.status} - ${res.statusText}"}`
        } else
          return res.json()
    })
    .then( (data) => {
      if (typeof data === 'string')
        return data
      else
        return JSON.parse(data)
    })
    .catch(error => { 
      const emsg = typeof error !== 'undefined' ? error.message : 'undefined error'
      console.log('update failed', emsg) 
      return {error: emsg}
    });
}
