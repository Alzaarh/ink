const VideoCategory = require("../models/video.model");

exports.getAll = async () => {
  return await VideoCategory.find({}).sort({
    order: "asc",
    "videos.order": "asc",
  });
};
