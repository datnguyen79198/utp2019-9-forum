var utils = require('./utils');

exports.Signup = (req,res) => {
    utils.checkBody(req,res).then(result => {
      console.log('done check Signin Signal');
    });
}
