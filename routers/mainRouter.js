var path = require('path');
var fs = require('fs');

class Router {

    routing(req,res) {
      if (req.method == 'GET') {
        var fileUrl;
        if (req.url=='/') fileUrl = '/main';
        else fileUrl = req.url;
        var filePath = path.resolve('./views'+fileUrl+'.html');

        var sendMethod = require('./sendResponse');
        sendMethod.sendResponse(filePath,res,'text/html');
      }
      else if (req.method == 'POST') {
          if (req.url == '/signup') {
              var reg = require('./signup');
              reg.Signup(req,res);
          }
          else if (req.url == '/login') {
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
