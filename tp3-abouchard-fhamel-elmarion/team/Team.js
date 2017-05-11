//Team.js
var mongoose = require('mongoose');  
var TeamSchema = new mongoose.Schema({  
  color: String,
  score: Number
});
mongoose.model('Team', TeamSchema);
module.exports = mongoose.model('Team');