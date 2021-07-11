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
    } catch (err) {
        console.error(err);
        next(err);
    }
}

/** Add User **/
exports.signup = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    const data = req.body;

    const id = data.id;
    const name = data.name;
    const phone = data.phone;

    const status = data.status;

    const subWeekCount = parseInt(data.count);
    const request = data.request;

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
        pickup_total_count: subWeekCount*5,
        pickup_remain_count: subWeekCount*5,
        request: request,
    })
        .then(result => {
            res.send('구독자를 추가했습니다.');
        })
        .catch(err => {
            console.error(err);
            res.send('구독차 추가를 실패했습니다.');
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
            res.json(user);
        } else {
            res.send('ID와 패스워드가 일치하지 않습니다.');
        }
    } else {
        res.send('ID가 존재하지 않습니다.');
    }
}

/** Logout **/
exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/user/login');
}

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
            res.send('비밀번호가 변경되었습니다.')
        })
        .catch(err => {
            console.log(err);
            res.send('비밀번호 변경을 실패했습니다.')
        });
}