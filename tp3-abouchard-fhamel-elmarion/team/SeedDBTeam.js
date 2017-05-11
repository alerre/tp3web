//SeedDBTeam
var app = require('../server');
var Team = require('./team');
var fs = require('fs');
var team = null;

team = new Team();
team.color = "red";
team.score = 0;
team.save();

team = new Team();
team.color = "blue";
team.score = 0;
team.save();

team = new Team();
team.color = "yellow";
team.score = 0;
team.save();

team = new Team();
team.color = "green";
team.score = 0;
team.save();

team = new Team();
team.color = "purple";
team.score = 0;
team.save();
    
console.log('FINISH');