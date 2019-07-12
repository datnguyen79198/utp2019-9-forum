var utils = require('./utils');
var db = require('../database/mainDatabase');
var sendMethod = require('./sendResponse');

exports.getAllUsers = (req,res) => {
    utils.checkBody(req,res).then(result => {
        db.users.getAllUsers().then(result => {
            console.log("done get user info");
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(result));
            res.end();
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 400;
            res.end('Something go wrong');
        });
    },
    err => {
      console.log(err);
      res.statusCode = 400;
      res.end('Something go wrong');
    });
};
