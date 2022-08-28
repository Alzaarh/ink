const { validationResult } = require('express-validator');
const { add } = require('../services/subscriber.service');

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(201).json({ data: await add({ email: req.body.email }) });
};