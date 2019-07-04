var utils = require('./utils');
var db = require('../database/mainDatabase');

exports.Signup = (req,res) => {
    utils.checkBody(req,res).then(result => {
      console.log('done check Signin Signal ' + result.username + ' ' + result.password + ' ' + result.email);
      db.users.addUser(result.username,result.password,result.email).then(result => {
          console.log('done add new user to database');
          db.sessions.createSession(result.username).then(cookie => {
              console.log('done add new session to database');
              console.log(cookie);
          });
      });
    });
}
