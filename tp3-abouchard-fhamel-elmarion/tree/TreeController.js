// TreeController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json({ extended: true }));
var Tree = require('./tree');
var Parc = require('../parc/Parc');
var User = require('../user/user');
var Team = require('../team/team');
var TreeService = require('./TreeService');

// RETURNS ALL THE TREES
router.get('/:minlat/:maxlat/:minlong/:maxlong', function(req, res) {
    TreeService.serviceReturnAllTrees(req.params, function(err, trees) {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.status(200).send(trees);
        }
    })
});

// RETURNS ONE THE TREES
router.get('/:id', function(req, res) {

    TreeService.servisefindOneTree(req.params.id, function(err, tree) {
        if (err == "noTree") {
            res.status(404).send('Tree not found');
        } else if (err) {
            res.status(500).send('Server error');
        } else {
            res.status(200).send(tree);
        }

    })
});

// UPDATES A SINGLE TREE IN THE DATABASE
router.put('/:id', function(req, res) {

    if (!req.body.userid) {
        return res.status(401).send("Need authentification");
    } else {

        TreeService.servicetakeControleOfAtree(req.body.userid, req.params.id, function(err, tree) {

            if (err == 'cannot controle a tree you already controle') {
                res.status(400).send(err); //code err
            } else if (err == 'noTree') {
                return res.status(404).send('Cannot find the tree');
            } else if (err == 'NoUser') {
                return res.status(404).send('Cannot find the user');
            } else if (err) {
                return res.status(500).send(err);
            } else {
                return res.status(200).send(tree);
            }
        });
    }
});

router.get('/popular/one', function (req, res) {
    TreeService.serviceFindMostPopularTree(function(err, tree){
        res.status(200).send(tree);
    });
});


module.exports = router;