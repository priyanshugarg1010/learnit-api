const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createErrors.js");

const JWT_KEY = process.env.JWT_KEY;

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "user not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    console.log(req.body.email);
    console.log(req.body.password);
    if (!isCorrect) return next(createError(400, "wrong password or email"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_KEY
    );

    res
      .cookie("acessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("user created").redirect("/signin");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("acessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
module.exports = { login, register, logout };
