const express = require('express');
const router = express.Router();
const controller = require('./user_controller');
const passport = require('../config/passport');

// ★ DB connection
const mysql = require('mysql');
const dbConfig = require('../config/db_config');
const connection = mysql.createConnection(dbConfig);

/* GET users listing. */
router.get('/', controller.users);

router.get('/signup', controller.signup);
router.post('/signup_insert', controller.signup_insert);

router.get('/login', controller.login);
router.post('/login_user', function(req, res) {
    const id = req.body.id;
    const pw = req.body.password;
    const sql = 'SELECT * FROM user WHERE id=?';

    connection.query(sql, [id], function(err, results) {
        if (err) console.log(err);
        if (!results[0]) return res.send('please check your id.');


    });

    passport.authenticate('local-login', {
        successRedirect : '/user/loginSuccess',
        failureRedirect : '/user/loginFail',
        failureFlash : true
    });
});

router.get('/loginSuccess', controller.loginSuccess);
router.get('/loginFail', controller.loginFail);

router.get('/logout', controller.logout);

module.exports = router;