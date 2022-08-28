const router = require('express').Router();
const { body } = require('express-validator');

const User = require('../models/user.model');
const validate = require('../middlewares/validate.middleware');
const { create, update, show } = require('../controllers/visitor.controller');

router.post(
    '/',
    [
        body('email')
            .exists()
            .custom((value) => {
                return User.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject();
                    }
                });
            }),
        validate
    ],
    create
);

router.put('/:id', update);

router.get('/:id', show);

module.exports = router;