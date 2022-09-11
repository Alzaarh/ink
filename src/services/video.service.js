const fs = require("fs");

// third party modules
const encryptor = require("simple-encryptor")(
  require("../configs/auth.config").encryptionKey
);

const VideoCategory = require("../models/videoCategory.model");
const { videoDir } = require("../configs/storage.config");

exports.getAll = async () => {
  // fetch all video categories sorted by order
  const videoCategories = await VideoCategory.find({})
    .sort({
      order: "asc",
      "videos.order": "asc",
    })
    .lean();
  // encrypt current timestamp and add it to videos
  return videoCategories.map((videoCategory) => {
    return videoCategory.videos.map((video) => {
      video.code = encryptor.encrypt(Date.now());
      return videoCategory;
    });
  });
};

exports.stream = async (categoryID, videoID, range) => {
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

exports.getOne = async (categoryID, videoID) => {
  const category = await VideoCategory.findById(categoryID);
  if (category) {
    const video = category.videos.find(
      (video) => video._id.toString() === videoID
    );
    if (video) {
      const data = { ...video._doc };
      let nextVideo = category.videos.find(
        (nextVideo) => nextVideo.order === video.order + 1
      );
      if (nextVideo) {
        data.nextID = `${category._id}/${nextVideo._id}`;
      } else {
        const nextCategory = await VideoCategory.findOne({
          order: category.order + 1,
        });
        if (nextCategory) {
          nextVideo = nextCategory.videos.find((video) => video.order === 1);
          if (nextVideo) {
            data.nextID = `${nextCategory._id}/${nextVideo._id}`;
          }
        }
      }
      return data;
    }
  }
};

exports.create = async (data) => {
  await VideoCategory.create(data);
};
