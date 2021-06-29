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

/** Add User **/
exports.signup = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;

    const status = req.body.status;

    const subWeekCount = req.body.sub_week_count;
    const pickupTotalCount = req.body.pickup_total_count;
    const request = req.body.request;

    await model.User_Info.create({
        id: id,
        password: id,
        name: name,
        phone: phone
    })
    await model.Subscription.create({
        userInfoId: id,
        status: status
    })
    await model.Subscription_Detail.create({
        id: id,
        sub_week_count: subWeekCount,
        // total과 reamin은 최초에 같다. (count는 default 0)
        pickup_total_count: pickupTotalCount,
        pickup_remain_count: pickupTotalCount,
        request: request,
    })
        .then(result => {
            console.log('사용자 추가 완료');
            res.send('사용자 추가 완료');
        })
        .catch(err => {
            console.error(err);
            res.send('사용자 추가 실패');
        });

};


exports.login = (req, res, next) => {
    let userId = "";
    if (req.cookies['loginId'] !== undefined) {
        console.log('로그인 정보 있음');
        userId = req.cookies['loginId'];
    }
    res.render('login', {page: 'login', userId: userId});
}

/** Login **/
exports.login_user = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const password = data.password;
    const rememberId = data.rememberId;

    if (rememberId === "checked") {
        res.cookie('loginId', id);
    }

    console.log(req.session);
    req.session.user_id = id;
    console.log(req.session.user_id);

    const user = await model.User_Info.findOne({
        where: {id: id}
    });

    if (user !== null) {
        if (user.password === password) {
            console.log('login success!');
            res.json(user);
        } else {
            console.log('id and password does not match.');
            res.send('ID and Password does not match.');
        }
    } else {
        console.log('id does not exists.');
        res.send('ID does not exists.');
    }

    // SQL
    /*const sql = 'SELECT * FROM user_info WHERE id=?';
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
    });*/
}

/** Logout **/
exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/user/login');
};

/** PW Modify **/
exports.pw_modify = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const newPassword = data.newPassword;

    await model.User_Info.update({
        password: newPassword
    }, {
        where: {id: id}
    })
        .then(result => {
            console.log('비밀번호가 변경되었습니다.');
            res.send('비밀번호가 변경되었습니다.')
        })
        .catch(err => {
            console.log('비밀번호 변경을 실패했습니다.');
            res.send('비밀번호 변경을 실패했습니다.')
        });
}