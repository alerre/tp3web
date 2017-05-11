// UserService.js
var User = require('./user');
var userDAO = require('./UserDAO');
var jwt = require('jsonwebtoken');
var myToken = null;
var hash = require('./password')
var expressJWT = require('express-jwt');
var Regex = require("regex");
var regexEmail = require('regex-email');

module.exports = {

    serviceFindAllUsers: function(callback) {
        userDAO.findAllUsers(callback);
    },


    //utilisé par servicetakeControleOfAtree
    serviceFindOneUser: function(idUser, callback) {
        userDAO.findOneUser(idUser, callback);
    },



    serviceCreateUser: function(req, callback) {

        var regexPwd = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$");
        if (!req.name) {
            callback('noName');
        } else if (!req.email) {
            callback('noEmail');
        } else if (!regexEmail.test(req.email)) {
            callback('emailNotCompliant');
        } else if (!req.password) {
            callback('noPassword');
        } else if (!regexPwd.test(req.password)) {
            callback('passwordNotCompliant');
        } else if (!req.teamColor) {
            callback('noTeamColor');
        } else if (req.teamColor.toLowerCase() != "red" && req.teamColor.toLowerCase() != "blue" &&
            req.teamColor.toLowerCase() != "green" && req.teamColor.toLowerCase() != "yellow" &&
            req.teamColor.toLowerCase() != "purple") {
            callback('nameTeamColor');
        } else {
            userDAO.findUserByEmail(req, function(err, user) {

                if (!user[0]) {
                    userDAO.createUser(req, callback);
                } else {
                    callback('emailExist');
                }
            });
        }
    },



    serviceDeleteUser: function(idUser, callback) {
        userDAO.findOneUser(idUser, function(err, user) {
            if (!user) {
                callback('NoUser');
            } else {
                userDAO.deleteUser(idUser, function(err, user) {
                    callback('ok', user);
                });
            }
        })

    },



    serviceUpdateUser: function(idUser, req, callback) {
        if (req.email) {
            callback('NoEmail');
        } else if (req.teamColor) {
            callback('NoTeamColor');
        } else {
            userDAO.findOneUser(idUser, function(err, user) {
                if (!user) {
                    callback('noUser');
                } else {
                    userDAO.updateUser(idUser, req, function(err, user) {
                        callback('ok', user);
                    });
                }
            })

        }

    },



    serviceLoginUser: function(req, callback) {
        if (!req.email) {
            callback('noEmail');
        } else if (!req.password) {
            callback('noPassword');
        } else {
            userDAO.loginUser(req, callback);
        }

    },



    tokenUser: function(req, user, callback) {
        var pwdhash = hash.sha512(req.password, user.salt);
        if (user.password == pwdhash) {
            myToken = jwt.sign({ email: user.email, id: user._id }, 'QEKV1824FFAE%Q!');
            callback('ok', myToken)
        } else {
            callback('NoMatching');
        }
    },

    logOut: function(callback) {
        myToken = null;
        callback('logout', myToken);
    },

    //utilisé par servicetakeControleOfAtree
    serviceUpdateScoreUser: function(idUser, nbrPoint, callback) {
        userDAO.findOneUser(idUser, function(err, user) {
            if (err) callback('err');
            if (user.teamColor != "neutre") {
                user.score = user.score + nbrPoint;
                user.save();
                callback(err, user);
            }
        });
    }
};