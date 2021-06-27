const express = require('express');
const router = express.Router();
const controller = require('./admin_controller');

router.get('/user_info', controller.user_info);

module.exports = router;