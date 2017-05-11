// UserService.js

var parcDAO = require('./ParcDAO');
var TeamService = require('../team/teamService');

module.exports = {

    servicefindAllParcs: function(params, callback) {
        parcDAO.findAllParcs(params, callback);
    },

    servicefindParcsWithTreeName: function(treeName, callback) {
        parcDAO.findParcsWithTreeName(treeName, callback);
    },

    serviceUpdateParcWhenTreeControle: function(user1, user2, parc, callback) {
        var couleurEquipeControle = parc.equipeControle;
        var couleurUser1 = user1.teamColor;

        parcDAO.updateTeamColorParc(parc, user1.teamColor, 1, callback);
        var CouleursParc = {
            "red": parc.red,
            "blue": parc.blue,
            "yellow": parc.yellow,
            "green": parc.green,
            "purple": parc.purple
        };
        var CouleursParcTrie = Object.keys(CouleursParc).sort(function(a, b) {
            return CouleursParc[b] - CouleursParc[a];
        })
        if (user2.teamColor != "neutre") {
            parcDAO.updateTeamColorParc(parc, user2.teamColor, -1, callback);
        }
        if (parc.equipeControle != "neutre") {
            if (parc.equipeControle != CouleursParcTrie[0]) {
                TeamService.serviceUpdateScoreTeam(couleurEquipeControle, -50, callback);

                TeamService.serviceUpdateScoreTeam(CouleursParcTrie[0], 50, callback);
                parcDAO.updateParcControleColor(parc, CouleursParcTrie[0], callback);
            }
        } else {
            TeamService.serviceUpdateScoreTeam(user1.teamColor, 50, callback);
            parcDAO.updateParcControleColor(parc, user1.teamColor, callback);
        }
    }
};