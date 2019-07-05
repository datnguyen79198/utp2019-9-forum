var fs = require('fs');

var dbPath = __dirname + '/sessions.json';

class Session {
    constructor(id,username,date) {
        this.id = id;
        this.username = username;
        this.date = date;
    }
}

var generateID = () => {
    return '_' + Math.random().toString(36).substr(2,30);
}

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

exports.createSession = (username) => {
    return new Promise((resolve,reject) => {
        console.log('Create new session');
        fs.readFile(dbPath,'utf-8', (err,db) => {
            if (err) {
                console.log('Erro while reading sessions.json')
                reject(err)
            } else {
                db = JSON.parse(db);
                var date = new Date().getTime();
                var session = new Session(generateID(), username, date);
                db.Sessions.push(session);

                db_to_json = JSON.stringify(db, '', 4);

                fs.writeFile(dbPath, db_to_json, 'utf-8', function(err) {
                    if (err) {
                        console.log('Error while writing sessions.json');
                        reject(err);
                    } else {
                        console.log('Session created')
                        var location = 'session_id=' + session.id + '; username=' + session.username + ';Path = /';
                        resolve([location]);
                    }
                })
            }
        });
    });

};
