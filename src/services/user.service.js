const jwt = require("jsonwebtoken");

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
