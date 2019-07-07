var utils = require('./utils');
var db = require('../database/mainDatabase');
var sendMethod = require('./sendResponse');

exports.createThread = (req,res) => {
    utils.checkBody(req,res).then(result => {
        var cookie = utils.checkCookie(req);
        console.log('done check post thread Signal'+ result.title + ' ' + result.entry + ' ' + result.tags + ' ' + cookie['username']);
        db.threads.createThread(cookie['username'],result.title,result.entry,result.tags).then(result => {
            console.log('done create thread to db');
            sendMethod.sendResponse('./views/main.html',res,'text/html',cookie,'/');
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
}