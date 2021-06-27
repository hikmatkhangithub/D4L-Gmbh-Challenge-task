const { urlencoded } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Task schema for REST Api
var TaskSchema = new Schema({
  iD: {
    type: Number
  },
  name: {
    type: String,

  },
  nasa_jpl_url: {
    type: String,
    
  },
  is_potentially_hazardous_asteroid: {
    type: Boolean,
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);