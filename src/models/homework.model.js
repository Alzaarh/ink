const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  printables: [mongoose.Schema.Types.ObjectId],
});

const homeworkSchema = new mongoose.Schema({
  title: String,
  order: Number,
  files: [fileSchema],
});

const Homework = mongoose.model("Homework", homeworkSchema);

module.exports = Homework;
