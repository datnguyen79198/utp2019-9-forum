if (document.cookie == '/') {
    document.getElementById('displayUsername').innerHTML = "You are not login!";
}
else {
    var txt = document.cookie.split(';');
    var name;

    for (var i=0;i<txt.length;i++) {
      //console.log("username is = " + txt[1].indexOf("username"));
        if (txt[i].indexOf("username") !=-1) name = txt[i];
    }

    var login = name.split('=')[1];
    document.getElementById('displayUsername').innerHTML = 'Welcome ' + login;
}
