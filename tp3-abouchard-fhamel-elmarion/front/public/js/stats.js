//PostSignUp.js
if (authentifier()) {
    window.addEventListener('DOMContentLoaded', init, false);

    function init() {
        infoTeam();
        infoJoueur();
        bornePlusPopulaire();
        arbrePlusPopulaire();
    }

    function infoTeam() {
        var req = $.ajax({
            type: "GET",
            url: 'http://localhost:3000/teams/',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({})
        });

        req.done(function(result) {
            document.getElementById('premiereEquipe').textContent = "1 equipe = couleur : " + result[0].color + ", score : " + result[0].score;
            document.getElementById('deuxiemeEquipe').textContent = "2 equipe = couleur : " + result[1].color + ", score : " + result[1].score;
            document.getElementById('troisiemeEquipe').textContent = "3 equipe = couleur : " + result[2].color + ", score : " + result[2].score;
            document.getElementById('quatriemeEquipe').textContent = "4 equipe = couleur : " + result[3].color + ", score : " + result[3].score;
            document.getElementById('cinquiemeEquipe').textContent = "5 equipe = couleur : " + result[4].color + ", score : " + result[4].score;

        });
    }

    function infoJoueur() {
        getIdUser(function(result) {
            var req = $.ajax({
                type: "GET",
                url: 'http://localhost:3000/users/' + result,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({})
            });

            req.done(function(result) {
                document.getElementById('nomDuJoueur').textContent = "nom : " + result.name;
                document.getElementById('scoreDuJoueur').textContent = "score : " + result.score;
                document.getElementById('emailDuJoueur').textContent = "email : " + result.email;
                document.getElementById('equipeDuJoueur').textContent = "equipe : " + result.teamColor;
            });
        });
    }

    function bornePlusPopulaire() {
        var req = $.ajax({
            type: "GET",
            url: 'http://localhost:3000/bornes/popular/one',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({})
        });

        req.done(function(result) {
            document.getElementById('premiereBorne').textContent = "1 borne = id : " + result[0]._id + ", proprietere : " + result[0].teamColor + ", score : " + result[0].popularScore;
            document.getElementById('deuxiemeBorne').textContent = "2 borne = id : " + result[1]._id + ", proprietere : " + result[1].teamColor + ", score : " + result[1].popularScore;
            document.getElementById('troisiemeBorne').textContent = "3 borne = id : " + result[2]._id + ", proprietere : " + result[2].teamColor + ", score : " + result[2].popularScore;
            document.getElementById('quatriemeBorne').textContent = "4 borne = id : " + result[3]._id + ", proprietere : " + result[3].teamColor + ", score : " + result[3].popularScore;
            document.getElementById('cinquiemeBorne').textContent = "5 borne = id : " + result[4]._id + ", proprietere : " + result[4].teamColor + ", score : " + result[4].popularScore;

        });
    }

    function arbrePlusPopulaire() {
        var req = $.ajax({
            type: "GET",
            url: 'http://localhost:3000/trees/popular/one',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({})
        });

        req.done(function(result) {
            console.log(result);
            document.getElementById('premiereTree').textContent = "1 arbre = id : " + result[0]._id + ", proprietere : " + result[0].teamColor + ", score : " + result[0].popularScore;
            document.getElementById('deuxiemeTree').textContent = "2 arbre = id : " + result[1]._id + ", proprietere : " + result[1].teamColor + ", score : " + result[1].popularScore;
            document.getElementById('troisiemeTree').textContent = "3 arbre = id : " + result[2]._id + ", proprietere : " + result[2].teamColor + ", score : " + result[2].popularScore;
            document.getElementById('quatriemeTree').textContent = "4 arbre = id : " + result[3]._id + ", proprietere : " + result[3].teamColor + ", score : " + result[3].popularScore;
            document.getElementById('cinquiemeTree').textContent = "5 arbre = id : " + result[4]._id + ", proprietere : " + result[4].teamColor + ", score : " + result[4].popularScore;

        });
    }

} else {
    document.location.href = "/users/login";
}