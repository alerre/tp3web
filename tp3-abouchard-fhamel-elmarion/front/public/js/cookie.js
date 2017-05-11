function SetCookie(token) {
    document.cookie = "token=" + token + "; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/;";

}

function UnSetCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function authentifier() {
    if (getCookie("token") == "") {
        return false;
    } else {
        return true;
    }
}

function getIdUser(callback) {
    GetUserIdWithToken(getCookie("token"), function(result) {

        callback(result);
    });
}


function GetUserIdWithToken(token, callback) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/users/decodageuser/' + token,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(result) {
        callback(result.iduser);
    });
}



//alert(getIdUser());