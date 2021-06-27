module.exports = function(app) {
    var todoChallenge = require('../controllers/todoListController');
  var todoCheck = require ('./healthcheck')
   
  // todoChallenge Routes
    app.route('/probes/liveness')
      .get(todoChallenge.StatusCode)
  
  
    app.route('/nasa')
      .get(todoChallenge.nasadata)
      .post(todoChallenge.nasadata_post)
      
    app.route('/nasadatamongodb')
    .get(todoChallenge.nasaDataFromMongodb)

    app.route('/check')
   // .get(todoCheck.startServer)
  };