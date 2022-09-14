const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  seenByUsers: [mongoose.ObjectId],
  printables: [mongoose.Schema.Types.ObjectId],
  homeworks: [mongoose.Schema.Types.ObjectId],
});

const videoSchema = new mongoose.Schema({
  title: String,
  order: Number,
  files: [fileSchema],
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
