const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
// ★ DB connection
const mysql = require('mysql');
const dbConfig = require('../config/db_config');
const connection = mysql.createConnection(dbConfig);

passport.use('local', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    // passReqToCallback: true
}, (id, password, done) => {
    const sql = 'SELECT * FROM user WHERE id=?';
    connection.query(sql, [id], function (err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
            if (result[0].password == password) {
                console.log('login success!');
                const json = JSON.stringify(result[0]);
                const userInfo = JSON.parse(json);
                console.log('userInfo : ' + userInfo);
                return done(null, userInfo);
            } else {
                console.log('id and password does not match.');
                return done(null, false, { message: 'Incorrect'});
            }
        } else {
            console.log('id does not exists.');
            return done(null, false, { message: 'Incorrect'});
        }
    });

}));

// 사용자 인증에 성공했을 때 호출
passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});

// 사용자 인증 이후, 사용자 요청이 있을 때마다 호출
passport.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});


module.exports = passport