const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        /* 
        * 1 ->->-> waiting
        * 2 ->->-> success
        * 3 ->->-> fail
        */
        type: Number,
        required: true,
        default: 1
    },
    belongsTo: personSchema
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;