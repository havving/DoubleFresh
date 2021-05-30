const express = require('express');
const router = express.Router();
const controller = require('./user_controller');

/* GET users listing. */
router.get('/', controller.users);
router.get('/signup', controller.signup);

router.post('/signup_insert', controller.signup_insert);


module.exports = router;