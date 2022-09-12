const router = require("express").Router();
const { header, query } = require("express-validator");

const {
  index,
  stream,
  show,
  seen,
} = require("../controllers/video.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.get("/", auth, index);

router.get(
  "/:fileID/stream",
  [header("range").notEmpty()],
  auth,
  validate,
  stream
);

router.get("/:fileID", auth, show);

router.patch("/:fileID/seen", auth, seen);

// TODO: remove after launch
router.post("/", async (_req, res) => {
  const Video = require("../models/video.model");
  await Video.create([
    {
      title: "آماده سازی",
      order: 1,
      files: [
        {
          title: "ویدیو اول",
          path: "1.mp4",
          order: 1,
        },
        {
          title: "ویدیو دوم",
          path: "1.mp4",
          order: 2,
        },
      ],
    },
    {
      title: "حروف الفبا",
      order: 2,
      files: [
        {
          title: "ویدیو اول",
          path: "1.mp4",
          order: 1,
        },
        {
          title: "ویدیو دوم",
          path: "1.mp4",
          order: 2,
        },
      ],
    },
  ]);
  res.end();
});

module.exports = router;
