// BorneController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json({ extended: true }));
var Borne = require('./borne');
var Parc = require('../parc/Parc');
var User = require('../user/user');
var Team = require('../team/team');
var BorneService = require('./BorneService');

// RETURNS ALL THE BORNE
router.get('/:minlat/:maxlat/:minlong/:maxlong', function (req, res) {
    BorneService.serviceReturnAllBorne(req.params, function(err, bornes)
    {
        if(err)
        {
            res.status(500).send('Server error');
        }
        else
        {
           res.status(200).send(bornes); 
        }
    });
});

// RETURNS ONE THE BORNE
router.get('/:id', function (req, res) {

    BorneService.servisefindOneBorne(req.params.id, function(err, borne)
    {
        if(err == "noborne")
        {
            res.status(404).send('borne not found');
        }
        else if(err)
        {
            res.status(500).send('Server error');
        }
        else
        {
            res.status(200).send(borne);
        }
        
    })
});

router.get('/popular/one', function (req, res) {
    BorneService.serviceFindMostPopularBorne(function(err, borne){
        res.status(200).send(borne);
    });
});

// UPDATES A SINGLE BORNE IN THE DATABASE
router.put('/:id', function (req, res) {

    if(!req.body.userid)
    {
        return res.status(401).send("Need user ID");
    }
    else
    {
    
        BorneService.servicetakeControleOfABorne(req.body.userid, req.params.id, function(err, borne){
        if(err == 'cannot controle a borne you already controle')
        {
            res.status(400).send(err);//code err
        }
        else if(err == 'noborne')
        {
            return res.status(404).send('Cannot find the borne');
        }
        else if(err == 'NoUser')
        {
            return res.status(404).send('Cannot find the user');
        }
        else if(err)
        {
            return res.status(500).send(err);
        }
        else
        {
            return res.status(200).send(borne);
        }
        });
    }
});


module.exports = router;