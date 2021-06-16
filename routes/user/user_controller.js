// ★ DB connection
const mysql = require('mysql');
const dbConfig = require('../config/db_config');
const connection = mysql.createConnection(dbConfig);

// passport
const passport = require('../config/passport');

// model
const model = require('../../models');

exports.users = async (req, res, next) => {
    try {
        const user = await model.User_Info.findAll();
        res.send(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
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
    let userId = "";
    if (req.cookies['loginId'] !== undefined) {
        console.log('로그인 정보 있음');
        userId = req.cookies['loginId'];
    }
    res.render('login', {page: 'login', userId: userId});
}

exports.login_user = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    let isLogin = false;
    const data  = req.body;

    const id = data.id;
    const password = data.password;
    const rememberId = data.rememberId;
    console.log("id : " + id);
    console.log("pwd : " + password);
    console.log("아이디 저장? : " + rememberId);

    if (rememberId === "checked") {
        res.cookie('loginId', id);
    }

    console.log(req.session);
    req.session.user_id = id;
    console.log(req.session.user_id);

    const sql = 'SELECT * FROM user WHERE id=?';
    connection.query(sql, [id], function (err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
            if (result[0].password == password) {
                console.log('login success!');
                // const text = 'ID: ' + id;
                isLogin = true;
                res.send(isLogin);
                // res.render('loginSuccess', {page: 'loginSuccess', 'user_id': req.session.user_id});
            } else {
                console.log('id and password does not match.');
                res.send('ID and Password does not match.');
                // res.render('loginFail', {page: 'loginFail'});
            }
        } else {
            console.log('id does not exists.');
            res.send('ID does not exists.');
            // res.render('loginFail', {page: 'loginFail'});
        }
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