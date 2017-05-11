//map.js

if (authentifier()) {
    var arrayArbre = [];
    var arrayMarkerArbre = [];
    var arrayBorne = [];
    var arrayMarkerBorne = [];
    var arrayParcs = [];
    var arrayMarkerParc = [];
    var infoWindow;
    var carte;

    //purple//590c6f8460312d1c445342f3
    //green//58ff6bcf734d1d6c1a2c9936
    //red//58ffc29300140a1a38e6c37f
    //blue//58feb509734d1d6c1a2c50c8
    //yellow//590c76a928f1852ac86e62c1
    var userIdHardCoded;

    getIdUser(function(result) {
        userIdHardCoded = result;
        controleurChargement("donnees");
    });

    var elementsCharges = { "dom": false, "donnees": false, "api-google-map": false };

    function controleurChargement(nouvElemCharge) {
        console.log('controleurChargement: Nouvel élément chargé "' + nouvElemCharge + '".');
        if (typeof elementsCharges[nouvElemCharge] != "undefined") {
            elementsCharges[nouvElemCharge] = true;
            var tousCharge = true;
            for (var elem in elementsCharges) {
                if (!elementsCharges[elem])
                    tousCharge = false;
            }
            if (tousCharge) {
                console.log('controleurChargement: Tous les éléments ont été chargés.');
                traitementPostChargement();
            } else {
                console.log('controleurChargement: Il reste encore des éléments à charger.');
            }
        }
    }

    window.addEventListener('DOMContentLoaded', function() {
        console.log('DOM chargé.');
        controleurChargement("dom");
        chargerScriptAsync('https://maps.googleapis.com/maps/api/js?sensor=true&callback=apiGoogleMapCharge', null);
    }, false);



    function apiGoogleMapCharge() {
        console.log('API Google Map chargé.');

        controleurChargement("api-google-map");
    }

    function traitementPostChargement() {
        console.log('Traitement post-chargement.');
        initCarte();
    }


    function initCarte() {
        var posCentre = new google.maps.LatLng(46.793508, -71.263268);
        var optionsCarte = {
            "zoom": 19,
            "center": posCentre,
            "mapTypeId": google.maps.MapTypeId.ROADMAP
        };
        carte = new google.maps.Map(document.getElementById("carte-canvas"), optionsCarte);

        google.maps.event.addListener(carte, 'idle', function() {
            GenererDonnees();
        });

        google.maps.event.addListener(carte, 'click', function() {
            if (infoWindow) {
                infoWindow.close();
            }
        });

        google.maps.event.addListener(carte, 'zoom_changed', function() {

        });
    }

    //affiche Marqer Arbre
    function afficherUnArbreCarte(arbre) {

        var color;
        if (arbre.estMalade) {
            color = 'black';
        } else {
            switch (arbre.teamColor) {
                case "red":
                    color = 'red';
                    break;
                case "blue":
                    color = 'blue';
                    break;
                case "yellow":
                    color = 'orange';
                    break;
                case "green":
                    color = 'green';
                    break;
                case "purple":
                    color = 'purple';
                    break;
                default:
                    color = 'grey';
            }
        }
        GetOneUser(arbre.userIdControl, function(result) {

            var posRepere = new google.maps.LatLng(arbre.lat, arbre.lng);
            arrayMarkerArbre.push(new google.maps.Marker({
                "position": posRepere,
                "map": carte,
                "id": arbre._id,
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor: color,
                    scale: 3
                },
                "type": "trees",
                "objet": "Arbre",
                "user": result.name,
                "popularite": arbre.popularScore
            }));
            arrayMarkerArbre[arrayMarkerArbre.length - 1].addListener('click', function() {

                gererClickRepere(this);

            });
        });
    }


    function afficherUneBorneCarte(borne) {


        var color;
        switch (borne.teamColor) {
            case "red":
                color = 'red';
                break;
            case "blue":
                color = 'blue';
                break;
            case "yellow":
                color = 'orange';
                break;
            case "green":
                color = 'green';
                break;
            case "purple":
                color = 'purple';
                break;
            default:
                color = 'grey';
        }

        var posRepere = new google.maps.LatLng(borne.lat, borne.lng);

        GetOneUser(borne.userIdControl, function(result) {

            arrayMarkerBorne.push(new google.maps.Marker({
                "position": posRepere,
                "map": carte,
                "id": borne._id,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: color,
                    scale: 6
                },
                "type": "bornes",
                "objet": "Borne",
                "user": result.name,
                "popularite": borne.popularScore
            }));

            arrayMarkerBorne[arrayMarkerBorne.length - 1].addListener('click', function() {

                gererClickRepere(this);

            });
        });
    }



    function afficherUnParcCarte(parc) {


        var color;
        switch (parc.equipeControle) {
            case "red":
                color = 'red';
                break;
            case "blue":
                color = 'blue';
                break;
            case "yellow":
                color = 'orange';
                break;
            case "green":
                color = 'green';
                break;
            case "purple":
                color = 'purple';
                break;
            default:
                color = 'grey';
        }
        ///https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
        var flightPlanCoordinates = parc.coordinates;
        arrayMarkerParc.push(new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 7,
            "id": parc._id,
            "objet": "Parc",
            "name": parc.name,
            "equipeControle": parc.equipeControle,
            "red": parc.red,
            "blue": parc.blue,
            "yellow": parc.yellow,
            "green": parc.green,
            "purple": parc.purple,
        }));
        arrayMarkerParc[arrayMarkerParc.length - 1].setMap(carte);

        google.maps.event.addListener(arrayMarkerParc[arrayMarkerParc.length - 1], 'click', function(event) {
            if (infoWindow) {
                infoWindow.close();
            }
            infoWindow = new google.maps.InfoWindow({
                content: '<p>Objet: ' + this.get('objet') + '</p>' +
                    '<p>Nom: ' + this.get('name') + '</p>' +
                    '<p>Équipe contrôle: ' + this.get('equipeControle') + '</p>' +
                    '<p>Nombre de possession: </p>' +
                    '<p>red: ' + this.get('red') + '</p>' +
                    '<p>blue: ' + this.get('blue') + '</p>' +
                    '<p>yellow: ' + this.get('yellow') + '</p>' +
                    '<p>green: ' + this.get('green') + '</p>' +
                    '<p>purple: ' + this.get('purple') + '</p>'
            });

            // infowindow.position = event.latLng;
            infoWindow.setPosition(event.latLng);
            infoWindow.open(carte);
        });

    }


    function gererClickRepere(leRepere) {
        if (infoWindow) {
            infoWindow.close();
        }
        infoWindow = new google.maps.InfoWindow({

            content: '<p>Objet: ' + leRepere.get('objet') + '</p>' +
                '<p>Propriétaire: ' + leRepere.get('user') + '</p>' +
                '<p>Popularite: ' + leRepere.get('popularite') + '</p>' +
                '<button onclick="UpdateElem(\'' + leRepere.get('type') + '\', \'' + userIdHardCoded + '\', \'' + leRepere.get('id') + '\')">Contrôler cet ' + leRepere.get('objet') + '!</button>'
        });

        infoWindow.open(carte, leRepere);
        // Recentrage de la carte sur le nouveau repère.
        //carte.panTo(leRepere.getPosition());
    }

    function chargerScriptAsync(urlFichier, callbackFct) {
        var script = document.createElement('script');
        script.src = urlFichier;
        script.async = true;
        if (typeof callbackFct == "function") {
            script.addEventListener('load', callbackFct, false);
        }
        document.documentElement.firstChild.appendChild(script);
    }


    function GetElemInRectangle(type, minlat, maxlat, minlng, maxlng, callback) {
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/' + type + '/' + minlat + '/' + maxlat + '/' + minlng + '/' + maxlng
        }).done(function(result) {
            callback(result);
        });
    }


    function AjaxUpdateElem(type, userId, ElemId, callback) {
        $.ajax({
            type: "PUT",
            url: 'http://localhost:3000/' + type + '/' + ElemId,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ "userid": userId })
        }).done(function(result) {
            callback(result);

        }).fail(function(result) {
            callback(result.responseText);
        });
    }

    function UpdateElem(type, userId, ElemId) {
        AjaxUpdateElem(type, userId, ElemId, function(result) {
            if (result != 'cannot controle a tree you already controle') {
                if (result == 'cannot controle a borne you already controle') {

                    infoWindow.setContent(
                        '<p>Votre équipe contrôle déjà cette borne!<p/>'
                    );
                } else {
                    infoWindow.setContent(
                        '<p>Bravo!<p/>'
                    );
                    if (type == "trees") {
                        for (var i in arrayMarkerArbre) {
                            if (arrayMarkerArbre[i].get('id') == ElemId) {
                                arrayMarkerArbre[i].setMap(null);
                            }
                        }
                        var removed = false;
                        var i = 0;
                        while (!removed) {

                            if (arrayArbre[i]._id == ElemId) {
                                arrayArbre.splice(i, 1);
                                removed = true;
                            }
                            i++
                        }

                    } else {
                        for (var i in arrayMarkerBorne) {
                            if (arrayMarkerBorne[i].get('id') == ElemId) {
                                arrayMarkerBorne[i].setMap(null);
                            }
                        }
                        var removed = false;
                        var i = 0;
                        while (!removed) {

                            if (arrayBorne[i]._id == ElemId) {
                                arrayBorne.splice(i, 1);
                                removed = true;
                            }
                            i++
                        }
                    }
                    refreshOneElem(type, result);
                }
            } else {

                infoWindow.setContent(
                    '<p>Votre équipe contrôle déjà cet arbre!<p/>'
                );
            }
        })

    };

    function refreshOneElem(type, result) {
        removeParcMarkers();

        if (type == "trees") {
            arrayArbre.push(result);
            afficherUnArbreCarte(arrayArbre[arrayArbre.length - 1]);
        } else {
            arrayBorne.push(result);
            afficherUneBorneCarte(arrayBorne[arrayBorne.length - 1]);
        }

        var coindemap = carte.getBounds();
        var minlat = coindemap.getSouthWest().lat();
        var maxlat = coindemap.getNorthEast().lat();
        var minlng = coindemap.getSouthWest().lng();
        var maxlng = coindemap.getNorthEast().lng();
        setTimeout(function() { GenererParc(minlat, maxlat, minlng, maxlng); }, 1000);

    }

    function GetOneElem(type, idElem, callback) {
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/' + type + '/' + idElem
        }).done(function(result) {
            callback(result);
        });
    }

    function GetOneUser(userId, callback) {
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/users/' + userId
        }).done(function(result) {
            callback(result);
        });
    }

    function GenererDonnees() {
        var coindemap = carte.getBounds();
        var minlat = coindemap.getSouthWest().lat();
        var maxlat = coindemap.getNorthEast().lat();
        var minlng = coindemap.getSouthWest().lng();
        var maxlng = coindemap.getNorthEast().lng();

        if (carte.getZoom() < 19) {
            removeArbreMarkers();
            removeBorneMarkers();
        } else {

            GenererArbre(minlat, maxlat, minlng, maxlng);
            GenererBorne(minlat, maxlat, minlng, maxlng);


        }
        if (carte.getZoom() < 17) {
            removeParcMarkers();

        } else {
            GenererParc(minlat, maxlat, minlng, maxlng);
        }

    };


    function GenererArbre(minlat, maxlat, minlng, maxlng) {
        GetElemInRectangle('trees', minlat, maxlat, minlng, maxlng, function(result) {
            if (arrayMarkerArbre.length + arrayMarkerBorne.length >= 2000) {
                removeArbreMarkers();
                removeBorneMarkers();

                for (var i in result) {
                    arrayArbre.push(result[i]);
                    afficherUnArbreCarte(arrayArbre[arrayArbre.length - 1]);
                }
            } else {
                for (var i in result) {
                    var bTermine = false;
                    var found = false;
                    var j = 0;

                    while (!bTermine && j != arrayArbre.length) {
                        if (arrayArbre[j]._id == result[i]._id) {

                            found = true;
                        }
                        j++;
                    }

                    if (found == false) {
                        arrayArbre.push(result[i]);
                        afficherUnArbreCarte(arrayArbre[arrayArbre.length - 1]);
                    }
                }
            }
        });
    }

    function GenererBorne(minlat, maxlat, minlng, maxlng) {

        GetElemInRectangle('bornes', minlat, maxlat, minlng, maxlng, function(result) {
            for (var i in result) {

                var bTermine = false;
                var found = false;
                var j = 0;

                while (!bTermine && j != arrayBorne.length) {
                    if (arrayBorne[j]._id == result[i]._id) {
                        found = true;
                    }
                    j++;
                }

                if (found == false) {
                    arrayBorne.push(result[i]);
                    afficherUneBorneCarte(arrayBorne[arrayBorne.length - 1]);
                }
            }
        });
    }

    function GenererParc(minlat, maxlat, minlng, maxlng) {

        GetElemInRectangle('parcs', minlat, maxlat, minlng, maxlng, function(result) {
            for (var i in result) {
                if (arrayParcs.indexOf(result[i])) {
                    arrayParcs.push(result[i]);
                    afficherUnParcCarte(result[i]);
                }
            }
        });
    }


    function removeALLMarkers() {


        removeArbreMarkers();
        removeBorneMarkers();
        removeParcMarkers();

    }

    function removeArbreMarkers() {
        for (i = 0; i < arrayMarkerArbre.length; i++) {
            arrayMarkerArbre[i].setMap(null);
        }
        arrayMarkerArbre = [];
        arrayArbre = [];
    }

    function removeBorneMarkers() {
        for (i = 0; i < arrayMarkerBorne.length; i++) {
            arrayMarkerBorne[i].setMap(null);
        }

        arrayMarkerBorne = [];
        arrayBorne = [];
    }

    function removeParcMarkers() {
        for (i = 0; i < arrayMarkerParc.length; i++) {
            arrayMarkerParc[i].setMap(null);
        }

        arrayMarkerParc = [];
        arrayParcs = [];
    }
} else {
    document.location.href = "/users/login";
}