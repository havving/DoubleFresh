// ★ DB connection
const mysql = require('mysql');
const dbConfig = require('../config/db_config');
const connection = mysql.createConnection(dbConfig);

// passport
const passport = require('../config/passport');

exports.users = (req, res, next) => {
    res.send('Respond with a resource');
}

exports.signup = (req, res, next) => {
    res.render('signup', {page: 'signup'})
}

exports.signup_insert = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;

    const sql = 'INSERT INTO user(id, password, name, phone) value (?, ?, ?, ?)';
    const params = [id, password, name, phone];

    connection.query(sql, params, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.send('Insert Success!');
    });
}


exports.login = (req, res, next) => {
    res.render('login', {page: 'login'});
}

exports.login_user = (req, res, next) => {
    const id = req.body.id;
    const pw = req.body.password;
    const sql = 'SELECT * FROM user WHERE id=?';

    connection.query(sql, [id], function (err, results) {
        if (err) console.log(err);
        if (results.length > 0) {
            if (results[0].password == pw) {
                res.send('login success!');
            } else {
                res.send('id and password does not match.');
            }
        } else {
            res.send('id does not exists.');
        }
    });

    passport.authenticate('local-login', {
        successRedirect: '/user/loginSuccess',
        failureRedirect: '/user/loginFail',
        failureFlash: true
    });
}

exports.loginSuccess = (req, res, next) => {
    res.render('loginSuccess', {page: 'loginSuccess'});
}

exports.loginFail = (req, res, next) => {
    res.render('loginFail', {page: 'loginFail'});
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/user/login');
}