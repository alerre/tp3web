// TeamDAO.js

var Team = require('./team');

module.exports = 
{
    findOneTeamByColor: function(color, callback)
    {
        Team.findOne({"color": color}, function (err, team)
        {           
            callback(err, team);
        });
    },

    findAllTeams: function(callback)
    {
        Team.find({},null, {sort:{"score":-1}},  function (err, teams) {
            callback(err, teams)
        });
    }


}
