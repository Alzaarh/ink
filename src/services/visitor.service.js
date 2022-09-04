const Visitor = require("../models/visitor.model");

exports.create = async (email) => {
  const visitor = await Visitor.findOneAndUpdate(
    { email },
    { email },
    { upsert: true, returnDocument: "after" }
  );
  return visitor;
};

exports.update = async ({ id, name, phone }) => {
  return await Visitor.findByIdAndUpdate(id, { name, phone });
};

exports.getOne = async (id) => {
  return await Visitor.findById(id);
};
