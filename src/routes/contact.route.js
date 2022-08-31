const router = require('express').Router();
const { body } = require('express-validator');

const { create } = require('../controllers/contact.controller');
const validate = require('../middlewares/validate.middleware');

router.post(
    '/',
    [
        body('name').notEmpty(),
        body('email').notEmpty(),
        body('message').notEmpty()
    ],
    validate,
    create
);

module.exports = router;