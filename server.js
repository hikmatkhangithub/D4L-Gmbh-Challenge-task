var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  Task = require('./api/models/todoListModel');


require('dotenv').config()
bodyParser = require('body-parser');

// mongoose instance connection url connection
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.MONGODB_DATABASE_NAME}:${process.env.MONGODB_PASS}@alert-amigo.rx8zp.mongodb.net/D4L-Gmbh?retryWrites=true&w=majority`, {
    useCreateIndex: true,    
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB database connected.......")
}).catch(err => {
  console.log('DB Connection Error:', err);
  });

// Bodyparser for rest api
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Specified routes file for our REST api 
var routes = require("./api/routes/todoListRoute")
routes(app);

const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

// Endpoints to check the health of our Rest api
app.use('/live', health.LivenessEndpoint(healthcheck))
app.use('/health', health.HealthEndpoint(healthcheck))

// Show an error if a routes in not defined in our application
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found | Use /probes/liveness or /nasa or /nasadatamongodb to get data'})
  
});

// Show server side error if there is a problem on server side
app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// listening to port 3000
app.listen(port);

console.log('RESTful API server started on: ' + port);
console.log("PORT Address from env file: " + process.env.PORT)