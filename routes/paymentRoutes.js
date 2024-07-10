const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/visa', paymentController.processPayment);

module.exports = router;
