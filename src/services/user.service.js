const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const privateKey = process.env.JWT_KEY;

const generateToken = (email) => {
  return new Promise((resolve, reject) => {
    const meta = { algorithm: "HS256", expiresIn: 60 * 60 * 24 * 7 };
    jwt.sign({ email }, privateKey, meta, (err, token) => {
      if (!err) {
        resolve(token);
      } else {
        reject(err);
      }
    });
  });
};

exports.login = async (email) => {
  return await generateToken(email);
};

exports.showSelf = (user) => {
  const self = { ...user._doc };
  delete self.password;
  return self;
};

exports.updateSelf = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};
