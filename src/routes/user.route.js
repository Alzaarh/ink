const router = require("express").Router();
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const { login } = require("../controllers/user.controller");
const User = require("../models/user.model");
const validate = require("../middlewares/validate.middleware");

router.post(
  "/login",
  [
    body("email").custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        const error = "نام کاربری یا رمزعبور اشتباه است";
        if (!user) {
          return Promise.reject(error);
        }
        return bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (!result) {
              return Promise.reject(error);
            }
            req.user = user._doc;
          });
      });
    }),
  ],
  validate,
  login
);

module.exports = router;
