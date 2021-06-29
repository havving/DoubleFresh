const express = require('express');
const router = express.Router();
const controller = require('./user_controller');
// passport
const passport = require('../config/passport');

/* GET users listing. */
router.get('/', controller.users);

/** Add User **/
router.post('/signup', controller.signup);

router.get('/login', controller.login);
router.post('/login_user', controller.login_user);
// passport 사용 시
/*router.post('/login_user', passport.authenticate('local', {
    successRedirect: '/user/loginSuccess',
    failureRedirect: '/user/loginFail',
    failureFlash: true}));*/

/** Logout **/
router.get('/logout', controller.logout);

/** PW Modify **/
router.put('/pw_modify', controller.pw_modify);

module.exports = router;