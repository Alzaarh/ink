const router = require('express').Router();
const { body } = require('express-validator');

const { create, verify } = require('../controllers/transaction.controller');
const User = require('../models/user.model');
const validate = require('../middlewares/validate.middleware');

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
    validate,
    create
);

router.put('/:id', verify);

module.exports = router;