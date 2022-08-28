const JDate = require('jalali-date');

const { create, update, getOne } = require('../services/visitor.service');

exports.create = async (req, res) => {
    const visitor = await create(req.body.email);
    res.status(201).json({ data: { visitor } });
};

exports.update = async (req, res) => {
    res.json({ data: await update({ id: req.params.id, ...req.body }) });
};

exports.show = async (req, res) => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    res.json({
        data: {
            ...(await getOne(req.params.id))._doc,
            date: (new JDate(date)).format('DD MMMM YYYY')  
        } 
    });
};