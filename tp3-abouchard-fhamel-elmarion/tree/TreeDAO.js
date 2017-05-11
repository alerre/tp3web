// TreeDAO.js
var Tree = require('./tree');


module.exports = 
{
    //////////Gestion TAKE CONTRÔLE TREE///////////////
    ///trouver un arbre
    findOneTree: function(idTree, callback)
    {
        Tree.findById(idTree, function(err, tree)
        {
            if(!tree)
            {
                callback("noTree")
            }
            else
            {
                callback(err, tree)
            }
        }); 
    },

    updateTreeWhenNewControler: function(tree, user, callback)
    {
        tree.teamColor = user.teamColor;
        tree.popularScore +=1;
        tree.userIdControl = user._id;
        tree.save();
        callback(tree);

    },
    //////////Gestion TAKE CONTRÔLE TREE///////////////

    //////////RETURN ALL TREES IN GOOGLE MAP///////////////
    findAllTrees : function(req, callback)
    {   
        Tree.find({"lat": {$gte: req.minlat, $lte: req.maxlat}, "lng": {$gte: req.minlong, $lte: req.maxlong}}, function (err, trees) {
            callback(err, trees);
        });
    },

    findMostPopularTree: function(callback)
    {
        Tree.find({},null, {sort:{"popularScore":-1}, limit:5}, function(err, tree)
        {
            callback(err, tree);
        })
    }

    
}
