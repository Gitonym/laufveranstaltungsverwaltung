const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
let database = require('./db')

module.exports = function(passport) {
    try{
        passport.use(
            new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
                //match user
                let sql = `select * from users where username='${username}'`;
                database.query(sql, (err, response)=>{
                    if(err) throw err;
                    if(!(response.length > 0)) {
                        return done(null, false, { message: 'Dieser Benutzername ist nicht registriert' });
                    } else {
                        //match password
                        bcrypt.compare(password, response[0].hashedpassword, (err, isMatch)=>{
                            if(err) throw err;
                            if (isMatch) {
                                return done(null, response[0]);
                            } else {
                                return done(null, false, { message: 'Passwort falsch' });
                            }
                        })
                    }
                });
            })
        );

    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        let sql = `SELECT * FROM users WHERE username = ?`;
        database.query(sql, [username], (err, response) => {
            if (err) {
                return done(err);
            }
            if (response.length > 0) {
                done(null, response[0]); // User found
            } else {
                done(null, false); // User not found
            }
        });
    });
    
    } catch {
        res.redirect('/login');
    }
};