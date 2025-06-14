const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-controller');
const protect = require('../middlewares/auth-middleware');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/refresh-token', auth.refreshToken);
router.post('/logout', auth.logout);
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
