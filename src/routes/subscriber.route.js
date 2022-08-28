const router = require('express').Router();
const { body } = require('express-validator');

const { create } = require('../controllers/subscriber.controller');
const Subscriber = require('../models/subscriber.model');

router.post(
    '/',
    [
        body('email')
            .notEmpty()
            .isEmail()
            .custom((value) => {
                return Subscriber.findOne({ email: value }).then((subscriber) => {
                    if (subscriber) {
                        return Promise.reject('شما قبلا عضو شده اید');
                    }
                });
            })
    ], 
    create
);

module.exports = router;