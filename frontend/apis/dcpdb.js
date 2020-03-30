const insert_api = 'https://dailyciapi.azurewebsites.net/api/upsert_person?code=WpAa60FYNKnICu7ARAfWD8Xd37URihmO5c3nkI9ia24SHhlDVNCFgQ%3D%3D'

// local
// const insert_api = 'http://192.168.0.15:7071/api/upsert_person?mykey=123'

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
