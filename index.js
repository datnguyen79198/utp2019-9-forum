var http = require('http');
var fs = require('fs');
var path = require('path');

var indexRouter = require('./routers/mainRouter');

var hostname = 'localhost';
var port = 6969;
var router = new indexRouter();


//req = request
//res = respone
var server = http.createServer(function(req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);
    router.routing(req,res);
})

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
