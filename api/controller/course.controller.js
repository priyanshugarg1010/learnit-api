const Course = require("../models/course.model.js");
const MyCourse = require("../models/mycourse.model.js");
const User = require("../models/user.model.js");

const getCourses = async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
};

const getMyCourses = async (req, res) => {
  const email = await User.findOne({ email: req.params.email }).populate(
    "purchasedCourses"
  );
  if (email) {
    res.json({
      purchasedCourses: email.purchasedCourses || [],
    });
  } else {
    res.status(403).json({ message: "email not found" });
  }
};

const saveMyCourses = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (course) {
    const email = await User.findOne({ email: req.body.userEmail });
    if (email) {
      email.purchasedCourses.push(course);
      await email.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "email not found" });
    }
  } else {
    res.status(404).json({ message: "course not found" });
  }
};
module.exports = { getCourses, getMyCourses, saveMyCourses };
