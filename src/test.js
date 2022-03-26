const axios = require('axios');

const getHeader = async ()=>{
    const res = await axios.get('https://httpbin.org/get', {
  headers: {
    'Test-Header': 'test-value'
  }
});

console.log(res); // "test-value"

}
//.headers['Test-Header']