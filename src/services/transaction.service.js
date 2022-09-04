const ZarinpalCheckout = require("zarinpal-checkout");
const generator = require("generate-password");

const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const price = require("../configs/price.config");

const merchantID = process.env.MERCHANT_ID;
const isSandbox = process.env.SANDBOX ? true : false;
const callbackURL = process.env.CALLBACK_URL;
const zarinpal = ZarinpalCheckout.create(merchantID, isSandbox);

exports.create = async (data) => {
  const res = await zarinpal.PaymentRequest({
    Amount: price, // In Tomans
    CallbackURL: callbackURL,
    Description: "A Payment from Node.JS",
  });
  if (res.status === 100) {
    await Transaction.create({
      amount: price,
      id: res.authority,
      belongsTo: data,
    });
    return res.url;
  }
};

exports.verify = async (id) => {
  const response = await zarinpal.PaymentVerification({
    Amount: price, // In Tomans
    Authority: id,
  });
  const transaction = await Transaction.findOne({ id });
  if (response.status !== 100) {
    await transaction.fail();
    return false;
  } else {
    await transaction.success();
    transaction.refID = response.RefID;
    await transaction.save();
    const password = generator.generate({ length: 10, numbers: true });
    const newUser = await User.create({
      email: transaction.belongsTo.email,
      name: transaction.belongsTo.name,
      phone: transaction.belongsTophonel,
      password,
    });
    newUser.password = password;
    return { user: newUser };
  }
};
