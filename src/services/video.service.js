const fs = require("fs");
const mongoose = require("mongoose");

const VideoCategory = require("../models/video.model");
const { videoDir } = require("../configs/storage.config");

exports.getAll = async () => {
  return await VideoCategory.find({}).sort({
    order: "asc",
    "videos.order": "asc",
  });
};

exports.getOne = async (categoryID, videoID, range) => {
  const category = await VideoCategory.findById(categoryID);
  if (category) {
    const video = category.videos.find(
      (video) => video._id.toString() === videoID
    );
    if (video) {
      const videoSize = fs.statSync(`${videoDir}/${video.path}`).size;
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      return { videoSize, start, end, videoPath: `${videoDir}/${video.path}` };
    }
  }
};

exports.create = async (data) => {
  await VideoCategory.create(data);
};
