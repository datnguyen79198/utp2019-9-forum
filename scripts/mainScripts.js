
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

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        var thread;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++) {
            thread = document.createElement('tr');
            var tags = document.createElement('th');
            tags.setAttribute('width',"10%");
            var inner = document.createElement('a');
            var tag = myDB.Threads[i].tags.substr(1);
            inner.setAttribute('href','/filter/tag='+tag);
            inner.innerHTML = myDB.Threads[i].tags;
            tags.appendChild(inner);
            thread.appendChild(tags);

            var title = document.createElement('th');
            title.setAttribute('width',"60%");
            title.setAttribute('style',"background-color : #E5EEFD");

            var mainTitle = document.createElement('a');
            mainTitle.setAttribute('href','/thread/'+myDB.Threads[i].id);
            mainTitle.innerHTML = myDB.Threads[i].title;
            title.appendChild(mainTitle);
            thread.appendChild(title);

            var vote = document.createElement('th');
            vote.setAttribute('class',"text-center");
            vote.setAttribute('width',"10%");
            vote.innerHTML = myDB.Threads[i].upVote;
            thread.appendChild(vote);

            var cmt = document.createElement('th');
            cmt.setAttribute('width',"10%");
            cmt.setAttribute('style',"background-color : #E5EEFD");
            cmt.setAttribute('class',"text-center");
            cmt.innerHTML = Object.keys(myDB.Threads[i].comments).length;
            thread.appendChild(cmt);

            var author = document.createElement('th');
            author.setAttribute('width',"10%");
            author.innerHTML = myDB.Threads[i].author;
            thread.appendChild(author);
            thread.setAttribute('height','30');
            document.getElementById("displayThread").appendChild(thread);
        }
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
