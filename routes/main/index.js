const express = require('express');
const router = express.Router();
const controller = require('./main_controller')

router.get('/', controller.main);
router.post('/data', controller.data);

// get test
router.get('/documents/:id', controller.get);

// express test
router.get('/json', controller.json);

/** Pickup Time **/
router.put('/pickup_time', controller.pickup_time);

/** Fixed Pickup Time **/
router.put('/fixed_pickup_time', controller.fixed_pickup_time);

/** Fixed Pickup Date **/
router.put('/fixed_pickup_date', controller.fixed_pickup_date);

module.exports = router;