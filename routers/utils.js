var qs = require('querystring');

exports.checkBody = (req,res) => {
    return new Promise((resolve,reject) => {
        var body = '';

        req.on('readable',() => {
            var data = req.read();
            if (data!=null) body+=data;
        })
        .on('end',() => {
            try {
                if (body) {
                  body = qs.parse(body);
                }
                resolve(body);
            } catch (err) {
                res.statusCode = 400;
                res.end("Can't parse body");
                reject("400: Can't parse body");
            }
        })
    })
};

exports.checkCookie = req => {
    var cookie = req.headers.cookie;
    var tmp = {};
    cookie.split(';').forEach(st => {
        var a = st.split('=');
        if (a[0] === ' session_id' || a[0] === ' username' || a[0] === 'username' || a[0] === 'session_id') {
            var lol;
            if (a[0][0]==" ") lol = a[0].substr(1);
            else lol = a[0];
            console.log(lol + ' ' +a[1]);
            tmp[lol] = a[1];
        }
    })

    console.log("Session to list: " + tmp['username'] + ' ' + tmp['session_id']);
    return tmp;

};
