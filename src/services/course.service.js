const Course = require('../models/course.model');

exports.getAll = async () => {
    return await Course.find({});
};