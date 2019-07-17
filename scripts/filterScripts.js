
if (document.cookie == '/' || document.cookie == "") {
    document.getElementById('displayUsername').innerHTML = "You are not login!";
    document.getElementById('switchNavTab').innerHTML= '<li><a href="./views/login.html">Login</a></li><li><a href="./views/signup.html">Sign Up</a></li>';
}
else {
    var txt = document.cookie.split(';');
    var name="";

    for (var i=0;i<txt.length;i++) {
      //console.log("username is = " + txt[1].indexOf("username"));
        if (txt[i].indexOf("username") !=-1) name = txt[i];
    }
    var login = name.split('=')[1];
    if (login!=undefined) {
      document.getElementById('displayUsername').innerHTML = 'Welcome ' + login;
      document.getElementById('switchNavTab').innerHTML= '<li><a href="/add-post">Create new post</a></li><li><a href="./info">My info</a></li><li><a href="/logout">Log out</a></li>';
    } else {
      document.getElementById('displayUsername').innerHTML = "You are not login!";
      document.getElementById('switchNavTab').innerHTML= '<li><a href="./views/login.html">Login</a></li><li><a href="./views/signup.html">Sign Up</a></li>';
    }
}

var filterType = window.location.pathname.split('/')[2];
var filterTag = '#'+filterType.split('=')[1];
console.log(filterTag);

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        var numberOfThread=0;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++) numberOfThread+=(myDB.Threads[i].tags==filterTag);
        console.log(numberOfThread);
        if (numberOfThread==0) {
            findRes = document.createElement('tr');
            var inner = document.createElement('th');
            inner.innerHTML = '<font size="3"><i>'+"Sorry, there were no community results for " + filterTag + " tag"+'</i></font>';
            findRes.appendChild(inner);
            document.getElementById("displayThread").appendChild(findRes);
        } else {
            findRes = document.createElement('tr');
            var inner = document.createElement('th');
            inner.innerHTML = '<font size="3"><i>'+numberOfThread + " results found with " + filterTag + " tag"+'</i></font>';
            findRes.appendChild(inner);
            document.getElementById("displayThread").appendChild(findRes);
        }
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
