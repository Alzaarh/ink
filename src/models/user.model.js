const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    phone: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;