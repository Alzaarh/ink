const router = require("express").Router();
const { header, query } = require("express-validator");
const { index, show, stream } = require("../controllers/homework.controller");
const auth = require("../middlewares/auth.middleware");
const Homework = require("../models/homework.model");
const validate = require("../middlewares/validate.middleware");

router.get("/", auth, index);

router.get("/:fileID", auth, show);

router.get(
  "/:fileID/stream",
  [header("range").notEmpty()],
  auth,
  validate,
  stream
);

// TODO: remove after launch
router.post("/", async (_req, res) => {
  await Homework.create({
    title: "تکلیف اول",
    order: 1,
    files: [
      { title: "ویدیو اول", order: 1, path: "1.mp4" },
      { title: "ویدیو دوم", order: 2, path: "1.mp4" },
      { title: "ویدیو سوم", order: 3, path: "1.mp4" },
    ],
  });
  await Homework.create({
    title: "تکلیف دوم",
    order: 2,
    files: [
      { title: "ویدیو اول", order: 1, path: "1.mp4" },
      { title: "ویدیو دوم", order: 2, path: "1.mp4" },
      { title: "ویدیو سوم", order: 3, path: "1.mp4" },
    ],
  });
  res.end();
});

module.exports = router;
