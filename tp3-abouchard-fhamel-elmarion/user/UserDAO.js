// UserDAO.js

var User = require('./user');
var hash = require('./password')

module.exports = 
{
    findAllUsers: function(callback)
    {
        User.find({}, function (err, users) {
            callback(err, users);
        });
    },

    findUserByEmail: function(req, callback)
    {
        User.find({"email": req.email}, function(err, user)
        {
            callback(err, user);
        });
    },

    findOneUser: function(idUser, callback)
    {
        User.findById(idUser, function(err, user)
        {
            callback(err, user)
        });    
    },

    createUser: function(req,callback)
    {
        var theSalt = hash.genRandomString(8);
        var thePWD = hash.sha512(req.password, theSalt);
        User.create({
            name : req.name,
            email : req.email,
            password : thePWD,
            score: 0,
            teamColor: req.teamColor.toLowerCase(),
            salt: theSalt
        }, function(err, user){
            callback(err,user);
        });
    },

    deleteUser: function(idUser, callback)
    {
        User.remove({"_id":idUser}, function(err, user)
        {
            callback(err, user);
        });
    },

    updateUser: function(idUser, req, callback)
    {
        var rName;
        var rPassword;
        var rSalt;

        User.findById(idUser, function(err, user)
        {
            if(!req.name)
            {
                name = user.name;
            }
            else
            {
                name = req.name;
            }

            if(!req.password)
            {
                rSalt = user.salt;
                rPassword = user.password;
            }
            else
            {
                rSalt = hash.genRandomString(8);
                rPassword = hash.sha512(req.password, rSalt);
            }
            if(!user)
            {
                callback(err);
            }
            else
            {
                User.update({"_id":idUser},{
                    name: rName,
                    password : rPassword,
                    salt: rSalt}, function(err, user){
                        callback(err, user);
                    });
            }
        })

    },

    loginUser: function(req, callback)
    {     
        User.findOne({"email":req.email}, function(err, user){
            callback(err, user)
        })
    }
}
