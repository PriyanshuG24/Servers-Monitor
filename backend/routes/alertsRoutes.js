
const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alertsController');

router.get('/', alertsController.getAlertCounts);
// router.post('/', alertsController.createAlert);

module.exports = router;
