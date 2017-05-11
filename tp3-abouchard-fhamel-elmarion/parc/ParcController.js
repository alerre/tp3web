// ParcController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json({ extended: true }));
var ParcService = require('./ParcService');
var Parc = require('../parc/Parc');



// RETURNS ALL THE PARCS
router.get('/:minlat/:maxlat/:minlng/:maxlng', function (req, res) {
    ParcService.servicefindAllParcs(req.params, function(err, parcs){
    if(err) res.status(500).send('Server error');

    res.status(200).send(parcs);
    });
});

module.exports = router;
