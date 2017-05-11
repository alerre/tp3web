// DogController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Dog = require('./dog');

// CREATES A NEW DOG
router.post('/', function (req, res) {
    Dog.create({
            name : req.body.name,
            race : req.body.race,
            userId : req.body.userId
        }, 
        function (err, dog) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(dog);
        });
});


//RETURNS ALL THE DOG FROM USER
router.get('/user/:userId', function(req,res){
    Dog.find({"userId": req.params.userId}, function(err, dog){
        if (err) return res.status(500).send("There was a problem finding the dog.");
        res.status(200).send(dog);
    });
});

// RETURNS ALL THE DOG
router.get('/', function (req, res) {
    Dog.find({}, function (err, dog) {
        if (err) return res.status(500).send("There was a problem finding the dog.");
        res.status(200).send(dog);
    });
});

// GETS A SINGLE DOG FROM THE DATABASE
router.get('/:id', function (req, res) {
    Dog.findById(req.params.id, function (err, dog) {
        if (err) return res.status(500).send("There was a problem finding the dog.");
        if (!dog) return res.status(404).send("No dog found.");
        res.status(200).send(dog);
    });
});

// DELETES A DOG FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Dog.findByIdAndRemove(req.params.id, function (err, dog) {
        if (err) return res.status(500).send("There was a problem deleting the dog.");
        res.status(200).send("Dog "+ dog.name +" was deleted.");
    });
});

// UPDATES A SINGLE DOG IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Dog.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, dog) {
        if (err) return res.status(500).send("There was a problem updating the dog.");
        res.status(200).send(dog);
    });
});
module.exports = router;