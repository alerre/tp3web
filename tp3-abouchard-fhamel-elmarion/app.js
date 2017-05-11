// app.js
var express = require('express');
var app = express();

var db = require('./db');
var expressjwt = require('express-jwt');

var jwt = require('jsonwebtoken');
var path = require('path');
var nunjucks = require('nunjucks');

nunjucks.configure('front/views', {
    autoescape: true,
    express: app
});

//todo a effacer
/*app.use(expressjwt({secret: 'QEKV1824FFAE%Q!'}).unless({ path: [
	'/users/login', 
	'/users/create',

	'/css/common.css',
	'/css/bootstrap.min.css',

	'/js/PostSignIn.js',
	'/js/bootstrap.min.js',
	'/js/map.js',
	'/js/PostSignIn.js',
	'/js/bootstrap.min.js',
	'/js/map.js'


	]}));

app.use(function(err, req, res, next) {
    if(401 == err.status) {
        res.redirect('/users/login');
    }
  });*/

app.use(express.static(path.join(__dirname, './front', '/public')));
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, './front', '/views'));


var UserController = require('./user/UserController');
app.use('/users', UserController);

var DogController = require('./dog/DogController');
app.use('/dogs', DogController);

var TeamController = require('./team/TeamController');
app.use('/teams', TeamController);

var TreeController = require('./tree/TreeController');
app.use('/trees', TreeController);

var BorneController = require('./borne/BorneController');
app.use('/bornes', BorneController);

var ParcController = require('./parc/ParcController');
app.use('/parcs', ParcController);

var MainController = require('./main/MainController');
app.use('', MainController);

module.exports = app;