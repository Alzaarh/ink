const { validationResult } = require('express-validator');

const validate = (data) => {
    const errors = validationResult(data);
    if (!errors.isEmpty()) {
        throw new Error({ errors: errors.array(), status: 0 });
    }
};

module.exports = validate;