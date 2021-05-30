const express = require('express');
const router = express.Router();
const controller = require('./main_controller')

router.get('/', controller.main);
router.post('/data', controller.data);

router.get('/login', controller.login);

// get test
router.get('/documents/:id', controller.get);

// express test
router.get('/json', controller.json);

module.exports = router;