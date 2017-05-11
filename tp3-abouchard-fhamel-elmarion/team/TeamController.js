// TeamController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Team = require('./team');
var TeamService = require('./teamService');

// RETURNS ALL THE TEAMS IN THE DATABASE
router.get('/', function (req, res) {
    TeamService.serviceFindAllTeams(function(err, teams)
    {
        if(err)
        {
            res.status(500).send('Server error');
        }
        else
        {
        res.status(200).send(teams);
        }
    });
});

// GETS A SINGLE TEAM FROM THE DATABASE
router.get('/:color', function (req, res) {
    TeamService.serviceFindOneTeamByColor(req.params.color, function(err, team)
    {
        if(err)
        {
            res.status(500).send('Servor error');
        }
        else if(!team)
        {
            res.status(404).send('No team found');
        }
        else
        {
        res.status(200).send(team);
        }
    });
});

module.exports = router;