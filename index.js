const axios = require('axios');
const { createReadStream } = require('fs');
const FormData = require('form-data');

const URL = process.env.SPRK_SERVER_URL;
const apiKey = process.env.SPRK_API_KEY;
const fileName = process.argv.slice(2)[0];
const form = new FormData();

if(!fileName){
    console.error('no filename provided');
    process.exit(0);
}

const fileData = createReadStream(fileName);
form.append('file', fileData);

axios({
    url     : URL,
    method  : 'POST',
    headers : {
        'Content-Type' : `multipart/form-data; boundary=${form._boundary}`,
        'api-key' : apiKey
    },
    data : form
}).then(responseUrl => {
    console.log(responseUrl.data);
}).catch(err => {
    console.error("Something went wrong", err);
})