const router = require("express").Router();

const { index } = require("../controllers/video.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, index);

module.exports = router;
