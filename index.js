const express = require('express');
const { apiHelper,createAxiosConfig } = require('./src/helper/apiHelperModule');
const FormData = require('form-data');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();

const port = process.env.PORT;
const hostname = process.env.hostname
const apiUrl = process.env.apiendpoint

app.listen(port | 5000,()=>{
    console.log("server started on port "+port);
});

app.use(express.json());

app.post('/submitApplication',async (req,res)=>{
    console.log('submitApplication');

    const resPath = path.join(__dirname,'./resources');
    console.log("pathname: "+resPath);

    //Get a List of Numbers to Sum 
    const numReqConfig  = createAxiosConfig("GET",`http://${hostname}:${port}/getNumberSum`,{},{});
    const {data}=  await apiHelper(numReqConfig);
    console.log(data);

    const jsonFormReq = jsonCreator(data);
    console.log(jsonFormReq);

    //create multipart request with given params
    const formData = new FormData();
    formData.append('application',JSON.stringify(jsonFormReq),{contentType:'application/json'});
    formData.append('file',fs.createReadStream(resPath+'/test.pdf'),{contentType:'appliation/octet-stream'});
    formData.append('source',fs.createReadStream(resPath+'/test.zip'),{contentType:'appliation/octet-stream'});

    const headers = {
        ...formData.getHeaders()
    }

    const config  = createAxiosConfig("POST",apiUrl,formData,headers);
    const response =  await apiHelper(config);

    res.send(response.data);

})

app.get('/getNumberSum',async (req,res)=>{

    const config  = createAxiosConfig("GET",apiUrl,{},{});

    const {data} =  await apiHelper(config);
    console.log(data);

    const result =   data.nums.reduce((prev,current)=> prev+current,0)
    console.log(result);

    res.send({
        "sum":result,
        "id":data?.id
    });
})


const jsonCreator = ({sum,id})=>{
    return {
        "applicant": {
            "firstName": "dummy",
            "lastName": "dummy"
        },
        "role": "Fullstack Developer",
        "referrer": "abc",
        "answer": {
            "questionId": id,
            "sum": sum
        }
    }
}


