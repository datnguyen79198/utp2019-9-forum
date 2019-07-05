var path = require('path');
var fs = require('fs');

class Router {

    routing(req,res) {
      if (req.method == 'GET') {
        var fileUrl;
        if (req.url=='/') fileUrl = './views/main.html';
        else if (req.url[0]!='.') fileUrl = '.'+req.url;
        else fileUrl = req.url;
        console.log(fileUrl);
        var sendMethod = require('./sendResponse');

        var filePath = path.resolve(fileUrl);

        var fileExt = path.extname(filePath);
        console.log(fileExt);
        if (fileExt == '.js') sendMethod.sendResponse(filePath,res,'text/javascript',null,null);
        else if (fileExt == '.css') sendMethod.sendResponse(filePath,res,'text/css',null,null);
        else sendMethod.sendResponse(filePath,res,'text/html',null,null);
      }
      else if (req.method == 'POST') {
          if (req.url == './views/signup.html') {
              var reg = require('./signup');
              reg.Signup(req,res);
          }
          else if (req.url == './views/login.html') {
              var auth = require('./login');
              auth.Login(req,res);
          }
      }
      else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h1> Error 404: ' + req.method + ' not supported</h1>');
      }
    }

}

module.exports = Router;
