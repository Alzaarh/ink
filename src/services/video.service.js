const fs = require("fs");
const mongoose = require("mongoose");
const encryptor = require("simple-encryptor")(
  require("../configs/auth.config").encryptionKey
);

const Video = require("../models/video.model");
const { videoDir } = require("../configs/storage.config");

exports.getAll = async () => {
  // fetch all videos sorted by order field (asc)
  const videos = await Video.find()
    .sort({
      order: "asc",
      "files.order": "asc",
    })
    .lean();

  return videos;
};

exports.stream = async (fileID, range, code) => {
  const video = await Video.findOne({ "files._id": fileID });

  if (video) {
    const timestamp = encryptor.decrypt(code);

    if (Date.now() - timestamp > 1000 * 60 * 60 * 2) {
      const file = video.files.find((file) => file._id.toString() === fileID);
      const videoSize = fs.statSync(`${videoDir}/${file.path}`).size;
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

      return { videoSize, start, end, videoPath: `${videoDir}/${file.path}` };
    }
  }
};

exports.getOne = async (fileID) => {
  // fetch the video using fileID
  const video = await Video.findOne({ "files._id": fileID }).lean();

  if (video) {
    // extract the correct file
    const file = video.files.find((file) => file._id.toString() === fileID);

    // find the next file
    let nextFile = video.files.find(
      (nextFile) => nextFile.order === file.order + 1
    );
    if (!nextFile) {
      const nextVideo = await Video.findOne({ order: video.order + 1 });
      if (nextVideo) {
        nextFile = nextVideo.files[0];
      }
    }
    file.nextID = nextFile ? nextFile._id : null;

    // encrypt current timestamp and add it to file
    file.code = encryptor.encrypt(Date.now());

    return file;
  }
};

exports.updateSeenByUsers = async (fileID, userID) => {
  const video = await Video.findOne({ "files._id": fileID });

  if (video) {
    const file = video.files.find((file) => file._id.toString() === fileID);

    const alreadySeen = file.seenByUsers.find((id) => id.toString() === userID);
    if (!alreadyseen) {
      file.seenByUsers.push(new mongoose.Types.ObjectId(userID));
      await file.save();
    }
    return true;
  }
};
