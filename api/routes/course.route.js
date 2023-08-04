// eslint-disable-next-line no-undef
const express = require("express");
const {
  getCourses,
  getMyCourses,
  saveMyCourses,
} = require("../controller/course.controller.js");
const router = express.Router();
const verifyToken = require("../middleware/jwt.js");

// router.delete("/:id", verifyToken, deleteUser);
// verifyToken,
router.get("/", getCourses);
router.get("/mycourses", getMyCourses);
router.post("/mycourses", saveMyCourses);

module.exports = router;
