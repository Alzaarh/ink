const fs = require("fs");
const router = require("express").Router();
const { header } = require("express-validator");

const { index, create, show } = require("../controllers/video.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.get("/", auth, index);

router.get(
  "/:categoryID/:id",
  [header("range").notEmpty()],
  validate,
  auth,
  show
);

router.post("/", create);

module.exports = router;
