// eslint-disable-next-line no-undef
const express = require("express");
const { deleteUser, getUser } = require("../controller/user.controller.js");
const router = express.Router();
const verifyToken = require("../middleware/jwt.js");

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);

module.exports = router;
