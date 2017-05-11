// parc.js
var mongoose = require('mongoose');  
var ParcSchema = new mongoose.Schema({  
  name: String,
  coordinates: [],
  teamIdControl: {type: mongoose.Schema.ObjectId, ref: 'Team'},       
  red: Number,
  blue: Number,
  yellow: Number,
  green: Number,
  purple: Number,
  equipeControle: String
});

mongoose.model('parc', ParcSchema);
module.exports = mongoose.model('parc');
