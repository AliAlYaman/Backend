const express = require('express');
const router = express.Router();
const { signup, login, refreshToken, logout } = require('../controllers/auth-controller');

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

module.exports = router;
