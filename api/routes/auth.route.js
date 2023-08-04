const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controller/auth.controller.js");

router.post("/signin", login);
router.post("/signup", register);
router.post("/logout", logout);

module.exports = router;
