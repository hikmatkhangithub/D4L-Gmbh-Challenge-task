/* const { Console } = require('console');
const https = require('https');

require('dotenv').config()

const nasaApiKey = process.env.NASA_API_KEY

let request = https.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`, ( res) => {
    console.log("This is a request body: " + req.body)

  if (res.statusCode !== 200) {
    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
    res.resume();
    return;
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
   
  });

  res.on('close', () => {
    console.log('Retrieved all data');
    console.log(JSON.parse(data));
   
  });


});


request.on('error', (err) => {
    console.error(`Encountered an error trying to make a request: ${err.message}`);
  });
  console.log("Testing api key" + process.env.NASA_API_KEY)
  console.log(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`) */