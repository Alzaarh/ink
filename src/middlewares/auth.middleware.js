const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const privateKey = process.env.JWT_KEY;

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (!err) {
        resolve(decoded);
      } else {
        reject(err);
      }
    });
  });
};

const auth = async (req, res, next) => {
  try {
    const token =
      req.query["accessToken"] || req.get("Authorization").split("Bearer ")[1];
    const decoded = await verify(token);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(401).json();
    } else {
      req.user = user;
      next();
    }
  } catch (_err) {
    res.status(401).json();
  }
};

module.exports = auth;
