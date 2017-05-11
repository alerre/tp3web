// TeamService.js

var TeamDAO = require('./teamDAO'); 

module.exports = {
    serviceUpdateScoreTeam: function(color, nbrPoint, callback)
    {
        TeamDAO.findOneTeamByColor(color, function(err, team)
        {
            if(err) callback('err');

            if(team)
            {
                team.score = team.score + nbrPoint;
                team.save();
            }
        });
    },

    serviceFindAllTeams : function(callback)
    {
        TeamDAO.findAllTeams(function(err, teams)
        {
            callback(err,teams);
        });
    },

    serviceFindOneTeamByColor : function(color, callback)
    {
        TeamDAO.findOneTeamByColor(color, function(err, team)
        {
            callback(err,team);
        });
    }
};
