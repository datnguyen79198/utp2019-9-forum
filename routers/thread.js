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

exports.getThreads = (req,res) => {
    utils.checkBody(req,res).then(result => {
        db.threads.getThreads().then(result => {
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

exports.addComment = (req,res) => {
    var post_id = req.url.split('/')[2];
    utils.checkBody(req,res).then(result => {
        db.threads.addReplyToThread(post_id,result.author,result.replyContent).then(result => {
            console.log("done add comment");
            var fileUrl = '.'+req;
            //sendMethod.sendResponse('./views/main.html',res,'text/html',cookie,'/');
        })
    });
}
