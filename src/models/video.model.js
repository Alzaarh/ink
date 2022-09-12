const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  seenByUsers: [mongoose.ObjectId],
});

const videoSchema = new mongoose.Schema({
  title: String,
  order: Number,
  files: [fileSchema],
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
