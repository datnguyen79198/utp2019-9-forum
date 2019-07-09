
var login;

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
    login = name.split('=')[1];
    if (login!=undefined) {
      document.getElementById('displayUsername').innerHTML = 'Welcome ' + login;
      document.getElementById('switchNavTab').innerHTML= '<li><a href="./views/myinfo.html">My info</a></li><li><a href="/logout">Log out</a></li>';
    } else {
      document.getElementById('displayUsername').innerHTML = "You are not login!";
      document.getElementById('switchNavTab').innerHTML= '<li><a href="./views/login.html">Login</a></li><li><a href="./views/signup.html">Sign Up</a></li>';
    }
}

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        var thread_id = window.location.pathname.split('/')[2];
        console.log(thread_id);
        var index;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++)
          if (myDB.Threads[i].id == thread_id) index = i;
        var date = document.createElement('tr');
        var timeThread = new Date(myDB.Threads[index].date);
        date.setAttribute('style',"background-color : #0B5FEA; color : white");
        date.innerHTML = timeThread;
        document.getElementById("displayThread").appendChild(date);

        var author = document.createElement('tr');
        var inner = document.createElement('th');
        inner.innerHTML = myDB.Threads[index].author;
        inner.setAttribute('style',"background-color : #E5EEFD; color : #0B5FEA");
        inner.setAttribute('height','60');
        author.appendChild(inner);
        document.getElementById("displayThread").appendChild(author);

        var title = document.createElement('tr');
        var inner = document.createElement('td');
        inner.innerHTML ='<b>' + myDB.Threads[index].title + '</b>';
        title.appendChild(inner);
        document.getElementById("displayThread").appendChild(title);

        var entry = document.createElement('tr');
        var inner = document.createElement('textarea');
        inner.innerHTML =myDB.Threads[index].entry;
        inner.setAttribute('cols',"145");
        inner.setAttribute('rows',"10");
        inner.setAttribute('readonly','readonly');
        entry.appendChild(inner);
        document.getElementById("displayThread").appendChild(entry);

        var tabFeature = document.createElement('table');
        var feature = document.createElement('tr');
        var like = document.createElement('th');
        like.setAttribute('width','5%');
        like.innerHTML = '<button class="btn"><i class="fa fa-thumbs-up"></i></button>';
        feature.appendChild(like);
        var dislike = document.createElement('th');
        dislike.setAttribute('width','5%');
        dislike.innerHTML = '<button class="btn"><i class="fa fa-thumbs-down"></i></button>';
        feature.appendChild(dislike);
        var upVote = document.createElement('th');
        upVote.setAttribute('width','5%');
        upVote.innerHTML = "this is up vote";
        feature.appendChild(upVote);
        var comments = document.createElement('th');
        comments.setAttribute('width','85%');
        comments.setAttribute('style','text-align: right');
        comments.innerHTML = '<i class="fa fa-comments"></i>' + " this is comments";
        feature.appendChild(comments);
        tabFeature.appendChild(feature);
        document.getElementById("displayThread").appendChild(tabFeature);

        if (login!=undefined) {
            var nowUser = document.createElement('p');
            nowUser.innerHTML = "<br> Comment as " + login;
            document.getElementById("displayThread").appendChild(nowUser);

            var block = document.createElement('div');
            var commentArea = document.createElement('form');
            commentArea.setAttribute('method','post');
            var area = document.createElement('textarea');
            area.setAttribute('cols',"145");
            area.setAttribute('rows',"5");
            area.setAttribute('name','replyContent');
            area.setAttribute('placeholder','What are your thoughts ?')
            commentArea.appendChild(area);
            var author = document.createElement('input');
            author.setAttribute('type','hidden');
            author.setAttribute('name','author');
            author.setAttribute('value',login);
            commentArea.appendChild(author);
            var postButton = document.createElement('button');
            postButton.setAttribute('type','submit');
            postButton.setAttribute('class','btn btn-primary');
            postButton.setAttribute('style','float: right');
            postButton.innerHTML = "COMMENT";
            commentArea.appendChild(postButton);
            block.appendChild(commentArea);
            document.getElementById("displayThread").appendChild(block);
        }
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
