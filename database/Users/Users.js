var fs = require('fs');

var dbPath = __dirname + '/users.json';

exports.connect = () => {
    // Create new json file if don't exist
    try {
      console.log('Reading to ' + dbPath);
      var users = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
      console.log('Successful reading users.json');
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) { // error no suck directory
            console.log('Creating database with users');
            var users = { "Users": [] };
            fs.writeFileSync(dbPath, JSON.stringify(users, '', 4), 'utf-8');
        } else console.log(err);
    }
}
