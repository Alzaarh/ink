const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, required: true },
  seenByUsers: [mongoose.ObjectId],
});

const videoCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  videos: [videoSchema],
});

const VideoCategory = mongoose.model("VideoCategory", videoCategorySchema);

module.exports = VideoCategory;

const video = {
  title: "category-1",
  order: 1,
  videos: [
    { title: "video-1", order: 1, path: "file-1", seen: true },
    { title: "video-2", order: 2, path: "file-2", seen: false },
    { title: "video-3", order: 3, path: "file-3", seen: true },
  ],
};
