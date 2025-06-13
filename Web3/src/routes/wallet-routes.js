const express = require("express");
const router = express.Router();
const {generateWallet, getUserWallets } = require("../controllers/wallet-controller");
const auth = require('../middlewares/auth');

router.use(auth); 

router.post("/generate",  generateWallet);
router.get("/",  getUserWallets);

module.exports = router;
