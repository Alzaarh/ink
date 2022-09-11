const router = require("express").Router();
const { index, show } = require("../controllers/printable.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, index);

router.get("/:fileID", auth, show);

// TODO: remove after launch
router.post("/", async (_req, res) => {
  const Printable = require("../models/printable.model");
  await Printable.create([
    {
      title: "سرمشق ها",
      order: 1,
      files: [
        {
          title: "فایل اول",
          path: "1.pdf",
          order: 1,
        },
        {
          title: "فایل دوم",
          path: "1.pdf",
          order: 2,
        },
        {
          title: "فایل سوم",
          path: "1.pdf",
          order: 3,
        },
      ],
    },
    {
      title: "چک لیست ها",
      order: 2,
      files: [
        {
          title: "فایل اول",
          path: "1.pdf",
          order: 1,
        },
        {
          title: "فایل دوم",
          path: "1.pdf",
          order: 2,
        },
      ],
    },
  ]);
  res.json();
});

module.exports = router;
