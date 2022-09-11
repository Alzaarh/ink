const router = require("express").Router();

const { index } = require("../controllers/homework.controller");
const auth = require("../middlewares/auth.middleware");
const HomeworkCategory = require("../models/homework.model");

router.get("/", auth, index);

router.post("/", async (req, res) => {
  await HomeworkCategory.create({
    title: "تکلیف اول",
    order: 1,
    homeworks: [
      { title: "ویدیو اول", order: 1, path: "1.mp4" },
      { title: "ویدیو دوم", order: 2, path: "1.mp4" },
      { title: "ویدیو سوم", order: 3, path: "1.mp4" },
    ],
  });
  await HomeworkCategory.create({
    title: "تکلیف دوم",
    order: 2,
    homeworks: [
      { title: "ویدیو اول", order: 1, path: "1.mp4" },
      { title: "ویدیو دوم", order: 2, path: "1.mp4" },
      { title: "ویدیو سوم", order: 3, path: "1.mp4" },
    ],
  });
});

module.exports = router;
