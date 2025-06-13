// In routes/transfer.js
const express = require('express');
const router = express.Router();
const { transfer } = require('../controllers/transfer-controller');
const auth = require('../middlewares/auth');

router.use(auth); 
router.post('/', transfer);

module.exports = router;
