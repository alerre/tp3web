// ParcDAO.js

var Parc = require('./Parc');

module.exports = 
{
    findAllParcs: function(params, callback)
    {
        Parc.aggregate(
            {$match: 
                {
                "coordinates.lat": {$gte: parseFloat(params.minlat.replace(",", ".")), $lte: parseFloat(params.maxlat.replace(",", "."))},
                "coordinates.lng": {$gte: parseFloat(params.minlng.replace(",", ".")), $lte: parseFloat(params.maxlng.replace(",", "."))}
                }
            },
            function (err, parcs) {
                callback(err, parcs);
            });
    },

    findParcsWithTreeName: function(nameTree, callback)
    {
         Parc.findOne({name:nameTree}, function (err, parc) {

         callback(err, parc);
         });
    },

    updateTeamColorParc: function(parc, couleur, pts, callback)
    {
        parc[couleur] = parc[couleur] + pts;
        parc.save();
         callback(null, parc);
    },
    
    updateParcControleColor: function(parc, couleur, callback)
    {
        parc.equipeControle = couleur;
        parc.save();
         callback(null, parc);
    }
}
