var path = require('path');
var fs = require('fs');

class Router {

    routing(req,res) {
      var fileUrl;
      if (req.url=='/') fileUrl = './views/main.html';
      else if (req.url[0]!='.') fileUrl = '.'+req.url;
      else fileUrl = req.url;
      if (req.method == 'GET') {
        var sendMethod = require('./sendResponse');

        var filePath = path.resolve(fileUrl);

        var fileExt = path.extname(filePath);
        if (fileExt == '.js') sendMethod.sendResponse(filePath,res,'text/javascript',null,null);
        else if (fileExt == '.css') sendMethod.sendResponse(filePath,res,'text/css',null,null);
        else if (fileExt == '.html') sendMethod.sendResponse(filePath,res,'text/html',null,null);
        else {
            if (req.url == '/logout') {
                var out = require('./logout');
                out.Logout(req,res);
            }
            else if (req.url == '/threads') {
                var post = require('./thread');
                post.getThreads(req,res);
            }
        }
      }
      else if (req.method == 'POST') {
          if (fileUrl == './views/signup.html') {
              var reg = require('./signup');
              reg.Signup(req,res);
          }
          else if (fileUrl == './views/login.html') {
              var auth = require('./login');
              auth.Login(req,res);
          }
          else if (fileUrl == './views/newpost.html') {
              var post = require('./thread');
              post.createThread(req,res);
          }
      }
      else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h1> Error 404: ' + req.method + ' not supported</h1>');
      }
    }

}

module.exports = Router;
