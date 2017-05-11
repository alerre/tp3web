// MainController.js
var express = require('express');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json({ extended: true }));
var path = require('path');

//INDEX
router.get('', function(req, res) {
    res.render('index.njk');
});

router.get('/stats', function(req, res) {
    res.render('stats.njk');
});
//res.writeHead(200, { "Content-Type": "text/plain" });
//res.sendFile(path.join(__dirname, '../front', 'index.html'));


module.exports = router;