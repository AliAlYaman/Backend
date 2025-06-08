const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createPaymentRequest, getPaymentRequests } = require('../controllers/payment-controller');

router.use(auth); // protect all payment routes

router.post('/', createPaymentRequest);
router.get('/', getPaymentRequests);

module.exports = router;
