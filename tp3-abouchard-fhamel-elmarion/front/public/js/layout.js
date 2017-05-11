if (authentifier()) {
    var ul = document.getElementById("navlogin");
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute('href', "/users/deconnexion");
    a.innerHTML = "Deconnexion";
    li.appendChild(a);
    ul.appendChild(li);
} else {
    var ul = document.getElementById("navlogin");
    var li = document.createElement("li");
    var li2 = document.createElement("li");
    var a = document.createElement("a");
    var a2 = document.createElement("a");

    a.setAttribute('href', "/users/create");
    a2.setAttribute('href', "/users/login");
    a.innerHTML = "Sign Up";
    a2.innerHTML = "Sign In";
    li.appendChild(a);
    li2.appendChild(a2);
    ul.appendChild(li);
    ul.appendChild(li2);
}