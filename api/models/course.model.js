// eslint-disable-next-line no-undef
const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

module.exports = mongoose.model("course", courseSchema);
