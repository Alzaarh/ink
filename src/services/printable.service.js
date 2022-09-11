const fs = require("fs");
const Printable = require("../models/printable.model");

exports.getAll = async () => {
  // fetch all printables in asc order
  const printables = await Printable.find().sort({
    order: "asc",
    "files.order": "asc",
  });

  return printables;
};

exports.getOne = async (fileID) => {
  // fetch the printable using fileID
  const printable = await Printable.findOne({ "files._id": fileID });

  if (printable) {
    // extract the correct file
    const file = printable.files.find((file) => file._id.toString() === fileID);
    return file;
  }
};
