const router = require("express").Router();
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const {
  login,
  showSelf,
  updateSelf,
} = require("../controllers/user.controller");
const User = require("../models/user.model");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");

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

router.get("/self", auth, showSelf);

router.put(
  "/self",
  auth,
  [
    body("name").isString(),
    body("phone").isString(),
    body("province").isString(),
    body("city").isString(),
    body("age").isNumeric(),
  ],
  updateSelf
);

module.exports = router;
