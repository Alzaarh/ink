const router = require("express").Router();

const { index } = require("../controllers/video.controller");

router.get("/", index);

module.exports = router;
