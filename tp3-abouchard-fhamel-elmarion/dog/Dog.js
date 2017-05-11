// Dog.js
var mongoose = require('mongoose');  
var DogSchema = new mongoose.Schema({  
  name: String,
  race: String,
  userId: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

mongoose.model('Dog', DogSchema);
module.exports = mongoose.model('Dog');
