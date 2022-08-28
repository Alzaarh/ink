const { getAll } = require('../services/course.service');

exports.index = async (_req, res) => {
    const courses = await getAll();
    res.json({data: courses});
};