const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const URL = process.env.MONGODB_URL;
// const stripe = require("stripe")(process.env.STRIPE_PRT_KEY);
const Stripe = require("stripe");

const cookieParser = require("cookie-parser");
// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   imageLink: String,
//   published: Boolean,
// });

// const Course = mongoose.model("course", courseSchema);
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");
const courseRoute = require("./routes/course.route.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://learnit-client.netlify.app"],
    credentials: true,
  })
);

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err.message);
  }
};

app.use("/user", authRoute);
app.use("/courses", courseRoute);

// app.use("/user", userRoute);

app.listen(3000, () => {
  connect();
  console.log("backend is runnig");
});
