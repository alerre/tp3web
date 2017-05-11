//PostSignIn.js

window.addEventListener('DOMContentLoaded', init, false);

function init() {
    document.getElementById("formSignIn").addEventListener("submit", login, false);
}

function login(e) {

    var req = $.ajax({
        type: "POST",
        url: 'http://localhost:3000/USERS/LOGIN',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value
        })
    });

    req.done(function(result) {

        SetCookie(result.token);
        document.location.href = "/";
    });

    req.fail(function(err) {
        //console.log(err.responseText);
        document.getElementById('dangerSignIn').textContent = err.responseText;

    });
    e.preventDefault();


}