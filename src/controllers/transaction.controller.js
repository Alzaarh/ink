const { validationResult } = require('express-validator');
const { create } = require('../services/transaction.service');

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    };
    const url = await create(data);
    if (url) {
        return res.status(201).json({ data: { url } });
    } 
    res.status(500).json({});
};

exports.verify = async (req, res) => {
    const data = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    };
};