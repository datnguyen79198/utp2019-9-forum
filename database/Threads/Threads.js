var fs = require('fs');

var dbPath = __dirname + '/threads.json';

class Thread {
    constructor(id,author,title,entry,tags,date) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.entry = entry;
        this.tags = tags;
        this.date = date;
    }
}

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

exports.createThread = (author,title,entry,tags) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            } else {
                db = JSON.parse(db);

                var thread = new Thread(Math.random().toString(36).slice(2),author,title,entry,tags,new Date().getTime());
                db.Threads.push(thread);

                db_to_json = JSON.stringify(db,'',4);
                fs.writeFile(dbPath, db_to_json, 'utf-8', (err) => {
                    if (err) {
                        console.log('Error while writing to db');
                        reject(err);
                    } else {
                        resolve(thread);
                    }
                })
            }
        });
    });
}
