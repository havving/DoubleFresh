const express = require('express');
const router = express.Router();
const controller = require('./user_controller');

/* GET users listing. */
router.get('/', controller.users);

router.get('/signup', controller.signup);
router.post('/signup_insert', controller.signup_insert);

router.get('/login', controller.login);
router.post('/login_user', controller.login_user);

router.get('/loginSuccess', controller.loginSuccess);
router.get('/loginFail', controller.loginFail);

router.get('/logout', controller.logout);

module.exports = router;