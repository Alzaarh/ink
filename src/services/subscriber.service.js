const Subscriber = require('../models/subscriber.model');

exports.add = async (data) => {
    return await Subscriber.create(data);
};