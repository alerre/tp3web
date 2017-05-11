//BorneDAO.js
var Borne = require('./borne');

module.exports = 
{
    //////////Gestion TAKE CONTRÔLE BORNE///////////////
    findOneBorne: function(idBorne, callback)
    {
        Borne.findById(idBorne, function(err, borne)
        {
            if(borne == null)
            {
                callback("noborne", borne)
            }
            else
            {
                callback(err, borne)
            }
        }); 
    },

    updateBorneWhenNewControler: function(borne, user, callback)
    {
        borne.teamColor = user.teamColor;
        borne.popularScore +=1;
        borne.userIdControl = user._id;
        borne.save();
        callback(borne);

    },

    //////////RETURN ALL BORNES IN GOOGLE MAP///////////////
    findAllBornes : function(req, callback)
    {   
        Borne.find({"lat": {$gte: req.minlat, $lte: req.maxlat}, "lng": {$gte: req.minlong, $lte: req.maxlong}}, function (err, bornes) {
            callback(err, bornes);
        });
    },

    findMostPopularBorne: function(callback)
    {
        Borne.find({},null, {sort:{"popularScore":-1}, limit:5}, function(err, borne)
        {
            callback(err, borne);
        })
    }
}
