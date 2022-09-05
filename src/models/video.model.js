const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  path: String,
  order: Number,
  seen: Boolean,
});

const videoCategorySchema = new mongoose.Schema({
  title: String,
  order: Number,
  videos: [videoSchema],
});

const VideoCategory = mongoose.model("VideoCategory", videoCategorySchema);

module.exports = VideoCategory;
