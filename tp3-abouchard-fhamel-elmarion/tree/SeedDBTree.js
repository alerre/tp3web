//SeedDBTree
var app = require('../server');
var Tree = require('./tree');
var fs = require('fs');
var results = JSON.parse(fs.readFileSync('../json/trees.json', 'utf8'));
var tree = null;
var coordinate = null;
//126016
for (var i = 90000; i < 126016; i++) {
    var val = results[i];

    tree = new Tree();
    tree.lat = parseFloat(val.LATITUDE.replace(",", "."));
    tree.lng = parseFloat(val.LONGITUDE.replace(",", "."));
    tree.name = val.NOM_FR;
    tree.parc = val.NOM_TOPO;
    tree.userIdControl = "58fb8c1c494a4a288c761a4c";
    tree.popularScore = 0;
    tree.teamColor = "neutre";
    tree.estMalade = false;
    tree.save();


}
console.log('FINISH');