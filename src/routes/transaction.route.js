const router = require('express').Router();
const { body } = require('express-validator');

const { create } = require('../controllers/transaction.controller');
const User = require('../models/user.model');

router.post(
    '/',
    [
        body('email')
            .notEmpty()
            .isEmail()
            .custom((value) => {
                return User.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject('ایمیل واردشده قبلا استفاده شده است');
                    }
                });
            }),
        body('name').notEmpty(),
        body('phone').notEmpty()
    ],
    create
);

module.exports = router;