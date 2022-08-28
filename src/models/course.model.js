const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;