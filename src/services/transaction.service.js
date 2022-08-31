const ZarinpalCheckout = require('zarinpal-checkout');

const Transaction = require('../models/transaction.model');
const price = require('../configs/price.config');

const merchantID = process.env.MERCHANT_ID
const isSandbox = process.env.SANDBOX ? true : false;
const callbackURL = process.env.CALLBACK_URL;
const zarinpal = ZarinpalCheckout.create(merchantID, isSandbox);

exports.create = async (data) => {
    const res = await zarinpal.PaymentRequest({
        Amount: price, // In Tomans
        CallbackURL: callbackURL,
        Description: 'A Payment from Node.JS'
    });
    if (res.status === 100) {
        await Transaction.create({
            amount: price,
            id: res.authority,
            belongsTo: data
        });
        return res.url;
    }
};

exports.verify = async (id, { amount }) => {
    const response = await zarinpal.PaymentVerification({
        Amount: amount, // In Tomans
        Authority: id
    });
    const transaction = await Transaction.findOne({ id });
    if (response.status !== 100) {
        await transaction.fail();
        return false;
    } else {
        await transaction.success();
        transaction.refID = response.RefID; 
        await transaction.save();
        return true;
    }
};