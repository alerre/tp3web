//SeedDBParc
var app = require('../server');
var Parc = require('./Parc');
var fs = require('fs');
var results = JSON.parse(fs.readFileSync('../json/parc.json', 'utf8'));
var parc = null;
var dict = {};
var array;

for (var i in results.features) {
    var val = results.features[i];

    parc = new Parc();
    str = val.properties.NOM_TOPOGR;
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÈÉÊË]/g, "E");
    str = str.replace(/[èéêë]/g, "e");
    str = str.replace(/[ÎÏ]/g, "I");
    str = str.replace(/[îïì]/g, "i");
    str = str.replace(/[ÔÖÒ]/g, "O");
    str = str.replace(/[ôöò]/g, "o");
    str = str.replace(/[ÛÜÙ]/g, "U");
    str = str.replace(/[ûüù]/g, "u");
    parc.name = str;
    dict = {};
    for (var j in val.geometry.coordinates) {
        var coord = val.geometry.coordinates[j];

        for (var k in coord) {
            var vraiCoord = coord[k];
            array = vraiCoord.toString().split(",");
            dict = {};
            dict.lat = parseFloat(array[1].replace(",", "."));
            dict.lng = parseFloat(array[0].replace(",", "."));

            parc.coordinates.push(dict);
        }
    }

    parc.red = 0;
    parc.blue = 0;
    parc.yellow = 0;
    parc.green = 0;
    parc.purple = 0;

    parc.equipeControle = "neutre";
    parc.save();
}
console.log('FINISH');