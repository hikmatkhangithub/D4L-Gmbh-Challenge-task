const https = require('https');
var mongoose = require('mongoose');
Task = mongoose.model('Tasks');

 require('dotenv').config()

 // Environment variables
 const nasaApiKey = process.env.NASA_API_KEY
 const START_DATE = "2015-09-07"
 const END_DATE = "2015-09-08"
 
 


// Node.js fetch package
 const fetch = require('node-fetch');   
 const Bluebird = require('bluebird');
 fetch.Promise = Bluebird;


// getting HTTP Status Code 200 on /probes/liveness.
 exports.StatusCode = function(req, res) {
    res.statuscode = 200;
    res.setHeader('Content-type', 'text/plain')
    res.end('This routes probes/liveness/ return a status code 200')
    console.log('Serving probes/liveness route');
};


// Fetching nasa data from Near-Earth-Objects (NEOs) api
exports.nasadata = async function(req, res) {

    const api_url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${nasaApiKey}`
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    
    res.json(json);
    console.log(json);
    console.log("Elemets count" + json.element_count)
   };


// Storing required params of nasa api data into MongoDB Atlas such as Id, name, nasa_jpl_url, is_potentially_hazardous_asteroid using post
   exports.nasadata_post = async function(req, res) {

    const api_url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${nasaApiKey}`
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log("Complete Data: " + json);
    
    
    var NasaProperty;
    var NasaPropertyArray;
    var Index;

  for (NasaProperty in json.near_earth_objects) {
    NasaPropertyArray = json.near_earth_objects[NasaProperty];
      console.log(NasaProperty + " has " + NasaPropertyArray.length + " versions listed");
      for (Index = 0; Index < NasaPropertyArray.length; ++Index) {
        console.log("NASA object Id : " + NasaPropertyArray[Index].id);
        console.log("NASA jpl url : " + NasaPropertyArray[Index].nasa_jpl_url);
        console.log("Potentially hazardous astroids : " + NasaPropertyArray[Index].is_potentially_hazardous_asteroid);

        const nasatask = new Task ({
            _id: new mongoose.Types.ObjectId(),
            iD: NasaPropertyArray[Index].id,
            name: NasaPropertyArray[Index].name,
            nasa_jpl_url: NasaPropertyArray[Index].nasa_jpl_url,
            is_potentially_hazardous_asteroid: NasaPropertyArray[Index].is_potentially_hazardous_asteroid,
            
        });
        nasatask
        .save(function(err, task) {
            if (err)
            console.log(err.response);
              res.send(err);
            res.json(task);
          });
      }
  }

   }; 
   
// Fetching nasa data from MongoDB
exports.nasaDataFromMongodb =  function(req, res) {

    Task.find({}, function(err, task) {
        if (err)
          res.send(err);
        res.json(task);
      });

   };
