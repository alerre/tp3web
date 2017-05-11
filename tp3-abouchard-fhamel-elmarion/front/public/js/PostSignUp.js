//PostSignUp.js

window.addEventListener('DOMContentLoaded', init, false);

function init() {
    document.getElementById("formSignUp").addEventListener("submit", addDB, false);
}

function addDB(e) {

    var req = $.ajax({
        type: "POST",
        url: 'http://localhost:3000/USERS/create',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": document.getElementById('name').value,
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value,
            "teamColor": document.getElementById('selectTeamColor').value
        })
    });

    req.done(function(result) {
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/USERS/LOGIN',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "email": document.getElementById('email').value,
                "password": document.getElementById('password').value
            })
        }).done(function(result) {
            SetCookie(result.token);
            document.location.href = "/"
        })
    });

    req.fail(function(err) {
        document.getElementById('danger').textContent = err.responseText;

    });

    e.preventDefault();


}