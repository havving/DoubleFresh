const express = require('express');
const router = express.Router();

// 기존 app.js에서 관리하던 url을 index.js에서 통합적으로 관리하도록 한다.
const main = require('./main');
const user = require('./user');
const admin = require('./admin');

router.use('/', main);
router.use('/user', user);
router.use('/admin', admin);

module.exports = router;