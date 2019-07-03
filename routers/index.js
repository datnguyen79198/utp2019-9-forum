var path = require('path');
var fs = require('fs');

class Router {

    routing(req,res) {
      if (req.method == 'GET') {
        var fileUrl;
        if (req.url=='/') fileUrl = '/main.html';
        else fileUrl = req.url;
        var filePath = path.resolve('./views'+fileUrl);
        var fileExt = path.extname(filePath); //file extesion
        if (fileExt == '.html') {
          fs.exists(filePath, function(exists) {
              //function(exists) is callback function
              if (!exists) {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.end('<h1> Error 404: ' + fileUrl + ' not found</h1>');
                return;
              }
              res.writeHead(200, {'Content-Type' : 'text/html'});
              fs.createReadStream(filePath).pipe(res);
            });
          }
        else {
          res.writeHead(404, {'Content-Type' : 'text/html'});
          res.end('<h1> Error 404: ' + fileUrl + ' not a HTML file</h1>');
        }
      }
      else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h1> Error 404: ' + req.method + ' not supported</h1>');
      }
    }

}

module.exports = Router;
