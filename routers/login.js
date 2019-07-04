var utils = require('./utils');

exports.Login = (req,res) => {
    utils.checkBody(req,res).then(result => {
      console.log('done check Login Signal');
    });
}
