var fs = require('fs');
var path = require('path');

exports.sendResponse = (filePath, res, content, cookies = null, redirect = null) => {
  if (fs.existsSync(path.resolve('', filePath))) {
      html = fs.readFileSync(filePath);
      header = {
        'Content-Type': content
      };
      if (cookies != null) header['Set-Cookie'] = cookies;

      if (redirect) {
          header['Location'] = redirect;
          res.writeHead(302, header);
          res.end();
      } else {
          res.writeHead(200, header);
          res.end(html);
      }
  } else {
      res.writeHead(404, {'Content-Type': content});
      res.end('404');
  }

};
