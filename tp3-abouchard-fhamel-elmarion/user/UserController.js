// UserController.js
var express = require('express');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json({ extended: true }));
var User = require('./user');
var UserService = require('./UserService');
var jwt_decode = require('jwt-decode');


//LOGIN
router.get('/login', function(req, res) {
    res.render('signIn.njk');
});

router.post('/login', function(req, res) {
    console.log(req.body);
    UserService.serviceLoginUser(req.body, function(err, user) {
        console.log('buuuu');
        if (err == 'noEmail') {
            res.status(400).send('email required');
        } else if (err == 'noPassword') {
            res.status(400).send('password required');
        } else if (err) {
            res.status(500).send('Server error');
        } else if (user == null) {
            res.status(404).send('No user found');
        } else {
            UserService.tokenUser(req.body, user, function(err, token) {
                if (err == 'NoMatching') {
                    res.status(400).send('No matching password');
                } else {
                    res.status(200).send('{"token": "' + token + '"}');
                }
            })
        }

    });

});

//FORM
router.get('/create', function(req, res) {
    res.render('signUp.njk');
});

router.get('/deconnexion', function(req, res) {
    res.render('deconnexion.njk');
});

router.get('/decodageuser/:token', function(req, res) {
    var decoded = jwt_decode(req.params.token);
    res.status(200).send('{"iduser": "' + decoded.id + '"}');
});

// CREATES A NEW USER
router.post('/create', function(req, res) {
    console.log('OK ENTRER');
    console.log(req.body);
    UserService.serviceCreateUser(req.body, function(err, user) {
        console.log('entrer service');
        if (err == 'noName') {
            res.status(400).send('need a name');
        } else if (err == 'noEmail') {
            res.status(400).send('need a email');
        } else if (err == 'emailNotCompliant') {
            res.status(400).send('email not compliant ex: abc@def.ghi');
        } else if (err == 'noPassword') {
            res.status(400).send('need a Password');
        } else if (err == 'passwordNotCompliant') {
            res.status(400).send('password not compliant. Need a capital letter, lowercase letter and a number');
        } else if (err == 'noTeamColor') {
            res.status(400).send('need a Team color');
        } else if (err == 'nameTeamColor') {
            res.status(400).send('Team color is not correct')
        } else if (err == 'emailExist') {
            res.status(400).send('Email already exist');
        } else if (err) {
            res.status(500).send('Server error');
        } else {
            res.location('/users/' + user._id);
            res.status(201).send(user);
        }
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/top10', function(req, res) {
    UserService.serviceFindAllUsers(function(err, users) {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.status(200).send(users);
        }
    });
});


// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function(req, res) {
    UserService.serviceFindOneUser(req.params.id, function(err, user) {
        if (err) {
            res.status(500).send('Server error');
        } else if (user == null) {
            res.status(404).send('No data found');
        } else {
            res.status(200).send(user);
        }
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function(req, res) {
    UserService.serviceDeleteUser(req.params.id, function(err, user) {
        if (err == 'NoUser') {
            res.status(404).send('No data found');
        } else if (err == 'ok') {
            res.status(204).send("User " + user.email + " was deleted.");
        } else {
            res.status(500).send('Server error');
        }
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function(req, res) {
    UserService.serviceUpdateUser(req.params.id, req.body, function(err, user) {
        if (err == 'NoEmail') {
            res.status(400).send("Can't change email");
        } else if (err == 'NoTeamColor') {
            res.status(400).send("You can't change your team");
        } else if (err == 'noUser') {
            res.status(404).send('User not found');
        } else if (err == 'ok') {
            res.status(200).send(user);
        } else {
            res.status(500).send("Server error");
        }
    });
});

module.exports = router;