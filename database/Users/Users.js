var fs = require('fs');

var dbPath = __dirname + '/users.json';

class User {
    constructor(username,password,email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

var findUser = (db,username) => {
    var user;
    for (var i = 0; i < db.Users.length; i++)
      if (db.Users[i].username == username)
          user = db.Users[i];
    return user;
};

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

exports.addUser = (username,password,email) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath, 'utf-8', (err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            } else {
                db = JSON.parse(db);

                if (!findUser(db,username)) {
                    var newUser = new User(username,password,email);
                    db.Users.push(newUser);
                    db_to_json = JSON.stringify(db,'',4);
                    fs.writeFile(dbPath, db_to_json, 'utf-8', (err) => {
                        if (err) {
                            console.log('Error while writing to db');
                            reject(err);
                        } else {
                            resolve(newUser);
                        }
                    })
                } else {
                    reject('Users exist');
                }
            }
        });
    });
};

exports.getUser = (username,password) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            } else {
                db = JSON.parse(db);
                var current_user = findUser(db,username);

                if (current_user) {
                    console.log(current_user.password + ' ' + password);
                    if (current_user.password == password) resolve(current_user);
                    else reject('Password not correct');
                } else {
                    reject('No such this user');
                }
            }
        });
    });
};
