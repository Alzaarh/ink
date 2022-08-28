const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    phone: String
}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;