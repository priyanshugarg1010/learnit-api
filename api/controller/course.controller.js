const mongoose = require("mongoose");
const Course = require("../models/course.model.js");
const MyCourse = require("../models/mycourse.model.js");
// const MyCourse = require("../models/mycourse.model.js");

const getCourses = async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
};

const getMyCourses = async (req, res) => {
  // logic to get all courses
  const courses = await MyCourse.find({});
  res.json({ courses });
};

const saveMyCourses = async (req, res) => {
  const course = new MyCourse(req.body);
  await course.save();
  res.json({ message: "course created successfully", courseId: course.id });
};
module.exports = { getCourses, getMyCourses, saveMyCourses };
