const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const createError = require("../utils/createErrors.js");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.acessToken;
  console.log(req.cookies);
  // Authorization: "Bearer " + localStorage.getItem("acessToken"),
  // const authHeader = await req.headers["authorization"];
  // let token = "";
  // if (authHeader) {
  // token = authHeader.split(" ")[1];
  // }
  console.log(token);
  if (!token) {
    return next(createError(401, "your are not authenticated"));
  }

  jwt.verify(token, JWT_KEY, async (err, payload) => {
    if (err) {
      return next(createError(403, err));
    }
    req.userId = payload._id;
    next();
  });
};

module.exports = verifyToken;
