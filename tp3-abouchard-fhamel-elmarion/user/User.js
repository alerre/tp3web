// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: {type :String, required: true},
  email: {type :String, required: true},
  password: {type :String, required: true},
  score: Number,
  teamColor: {type :String, required: true},
  salt: {type :String, required: true}
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');