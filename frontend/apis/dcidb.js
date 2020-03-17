// const insert_api = 'https://lxrpbe.azurewebsites.net/api/busLocations?code=skedW23Fclex0SYprCCTJkNtcV0HPdMDIGLfZSYA3NJDJLaoCGugDQ=='

// local
const insert_api = 'http://localhost:7071/api/insert/'

const headers = {
  'Accept': 'application/json'
}

export const insert = (userData) => {
    alert('will insert '+ userData.cough)
//   fetch(`${insert_api}?email=${userData.email}&fever=${userData.fever}&cough=${userData.cough}`, { headers }) 
    return fetch(`${insert_api}?email=blogs@blogss.com&fever=1&cough=0`, { headers }) 
    .then( (res) =>{
        return res.json()
    })
    .then( (data) => {
      return data
    })
    .catch(error => { 
      console.log('update failed', error) 
    });
}
