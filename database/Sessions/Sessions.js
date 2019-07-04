var fs = require('fs');

var dbPath = __dirname + '/sessions.json';

exports.connect = () => {
    // Create new json file if don't exist
    try {
      console.log('Reading to ' + dbPath);
      var sessions = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
      console.log('Successful reading sessions.json');
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) { // error no suck directory
            console.log('Creating database with sessions');
            var sessions = { "Sessions": [] };
            fs.writeFileSync(dbPath, JSON.stringify(sessions, '', 4), 'utf-8');
        } else console.log(err);
    }
}
