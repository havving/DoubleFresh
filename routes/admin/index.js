const express = require('express');
const router = express.Router();
const controller = require('./admin_controller');

router.get('/user_info', controller.user_info);

router.get('/user_info_detail/:id', controller.user_info_detail);

router.get('/pickup', controller.pickup);

module.exports = router;