var qs = require('querystring');

exports.checkBody = (req,res) => {
    return new Promise((resolve,reject) => {
        var body = '';

        req.on('readable',() => {
            var data = req.read();
            if (data!=null) body+=data;
        })
        .on('end',() => {
            console.log(body);
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
