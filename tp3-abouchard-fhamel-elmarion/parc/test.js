//SeedDBTree
var geolib = require('geolib');
var app = require('../server');

var Parc = require('../parc/Parc');
var Coordinate = require('../coordinate/Coordinate');
var fs = require('fs');
//126016
		

				if(geolib.isPointInside({latitude:(-71.33933), longitude:(46.806350)}, 
                [{latitude:-71.3412495547226, longitude:46.8070712571182},
                {latitude:-71.3409193857688,longitude:46.8072722796515},
                {latitude:-71.3402235092269,longitude:46.8073009431101},
                {latitude:-71.3401949331152,longitude:46.8073009819625},
                {latitude:-71.3401685149177,longitude:46.8072973973992},
                {latitude:-71.3401453983349,longitude:46.80729379759},
                {latitude:-71.3401183594483,longitude:46.8072856923682},
                {latitude:-71.3401017797716,longitude:46.8072786439164},
                {latitude:-71.3400751914259,longitude:46.8072641299206},
                {latitude:-71.3400664921493,longitude:46.807258292117},
                {latitude:-71.339013500929,longitude:46.8064937988113},
                {latitude:-71.339760021479,longitude:46.8060012570778},
                {latitude:-71.3408868489301,longitude:46.8068105071303},
                {latitude:-71.3412495547226,longitude:46.8070712571182}]
                ))
				{
					//tree.parc = parc._id;
					console.log("lol ta 'lair con la hein");
				}
				else
				{
					console.log("sorry");
				}
		
		

console.log('FINISH');