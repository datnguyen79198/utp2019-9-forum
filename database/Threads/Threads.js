var fs = require('fs');

var dbPath = __dirname + '/threads.json';

exports.connect = () => {
    // Create new json file if don't exist
    try {
      console.log('Reading to ' + dbPath);
      var users = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
      console.log('Successful reading threads.json');
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) { // error no suck directory
            console.log('Creating database with threads');
            var threads = { "Threads": [] };
            fs.writeFileSync(dbPath, JSON.stringify(threads, '', 4), 'utf-8');
        } else console.log(err);
    }
}
