const router = require('express').Router();

const { index } = require('../controllers/course.controller');

router.get('/', index);

module.exports = router;