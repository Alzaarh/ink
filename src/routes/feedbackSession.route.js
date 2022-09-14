const router = require("express").Router();
const { header } = require("express-validator");
const {
  index,
  show,
  stream,
} = require("../controllers/feedbackSession.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

router.get("/", auth, index);

router.get("/:id", auth, show);

router.get("/:id/stream", [header("range").notEmpty()], auth, validate, stream);

// TODO: remove after launch
router.post("/", async (req, res) => {
  const feedbackSession = require("../models/feedbackSession.model");

  await feedbackSession.create([
    {
      title: "جلسه اول",
      path: "1.mp4",
      printables: ["63216c4ab2bb120d964aa53e"],
    },
    {
      title: "جلسه دوم",
      path: "1.mp4",
      printables: ["63216c4ab2bb120d964aa53a", "63216c4ab2bb120d964aa53b"],
    },
  ]);
});

module.exports = router;
