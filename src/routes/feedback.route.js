const router = require("express").Router();
const multer = require("multer");

const { create } = require("../controllers/feedback.controller");
const auth = require("../middlewares/auth.middleware");

const upload = multer();

router.post("/", auth, upload.single("file"), create);

module.exports = router;
