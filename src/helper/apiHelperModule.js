
const axios = require('axios');

async function apiHelper(config) {
      return await axios.request(config);
}

function createAxiosConfig(method,url,data,headers){
      const config = {
          method:method,
          url:url,
          headers:headers,
          data:data?data:{}
      }
      console.log("createAxiosConfig: "+JSON.stringify(config));
      return config;
  }

module.exports = {apiHelper,createAxiosConfig};

