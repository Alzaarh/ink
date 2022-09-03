const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    phone: String,
    password: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;