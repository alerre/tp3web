// borne.js
var mongoose = require('mongoose');  
var BorneSchema = new mongoose.Schema({ 
  lat: Number,
  lng: Number,
  userIdControl: {type: mongoose.Schema.ObjectId, ref: 'User'},
  popularScore: Number,
  teamColor: String
});

mongoose.model('Borne', BorneSchema);
module.exports = mongoose.model('Borne');
