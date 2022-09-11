const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
});

const printableSchema = new mongoose.Schema({
  title: String,
  order: Number,
  files: [fileSchema],
});

const Printable = mongoose.model("Printable", printableSchema);

module.exports = Printable;
