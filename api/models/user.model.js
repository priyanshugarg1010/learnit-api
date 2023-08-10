// eslint-disable-next-line no-undef
const mongoose = require("mongoose");
const Course = require("../models/course.model");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
