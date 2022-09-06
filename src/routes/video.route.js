const fs = require("fs");
const router = require("express").Router();
const { header } = require("express-validator");

const {
  index,
  create,
  stream,
  show,
} = require("../controllers/video.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.get("/", auth, index);

router.get(
  "/:categoryID/:id/stream",
  [header("range").notEmpty()],
  validate,
  auth,
  stream
);

router.get("/:categoryID/:id", auth, show);

router.post("/", create);

module.exports = router;
