var utils = require('./utils');
var db = require('../database/mainDatabase');
var sendMethod = require('./sendResponse');

exports.createThread = (req,res) => {
    utils.checkBody(req,res).then(result => {
        console.log('done check post thread Signal'+ result.title + ' ' + result.entry + ' ' + result.tags);
    });
}
