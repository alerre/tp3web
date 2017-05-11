// tree.js
var mongoose = require('mongoose');  
var TreeSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,  
  userIdControl: {type: mongoose.Schema.ObjectId, ref: 'User'},
  popularScore: Number,
  parc: String,
  teamColor: String,
  estMalade: Boolean
});

mongoose.model('Tree', TreeSchema);
module.exports = mongoose.model('Tree');
