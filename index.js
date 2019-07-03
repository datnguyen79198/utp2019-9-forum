var http = require('http');

var hostname = 'localhost';
var port = 6969;


//req = request
//res = respone
var server = http.createServer((req,res) => {
    console.log(req.headers);
    res.writeHead(200, {
        'Content-Type' : 'text/html'
    });
    res.end('<h1> Hello MTF </h1>');
})

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
