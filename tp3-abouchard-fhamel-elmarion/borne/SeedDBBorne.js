//SeedDBBorne
var app = require('../server');
var Borne = require('./borne');
var fs = require('fs');
var results = JSON.parse(fs.readFileSync('../json/bornes.json', 'utf8'));
var borne = null;

for (var i in results) {
    var val = results[i];

    borne = new Borne();
    borne.lat = parseFloat(val.LATITUDE.replace(",", "."));
    borne.lng = parseFloat(val.LONGITUDE.replace(",", "."));
    borne.userIdControl = "58fb8c1c494a4a288c761a4c";
    borne.popularScore = 0;
    borne.teamColor = "neutre";
    borne.save();
}
console.log('FINISH');