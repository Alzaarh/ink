const fs = require("fs");
const Homework = require("../models/homework.model");
const Printable = require("../models/printable.model");
const { homeworkDir } = require("../configs/storage.config");

exports.getAll = async () => {
  const homeworks = await Homework.find().sort({
    order: "asc",
    "files.order": "asc",
  });

  return homeworks;
};

exports.getOne = async (fileID) => {
  const homework = await Homework.findOne({ "files._id": fileID }).lean();

  if (homework) {
    const file = homework.files.find((file) => file._id.toString() === fileID);

    const printables = await Printable.find();

    fileIDs = file.printables;
    file.printables = [];

    for (let i = 0; i < fileIDs.length; i++) {
      for (let j = 0; j < printables.length; j++) {
        const foundFile = printables[j].files.find(
          (file) => file._id.toString() === fileIDs[i].toString()
        );

        if (foundFile) {
          file.printables.push(foundFile);
        }
      }
    }

    return file;
  }
};

exports.stream = async (fileID, range, code) => {
  const homework = await Homework.findOne({ "files._id": fileID });

  if (homework) {
    // const timestamp = encryptor.decrypt(code);
    // if (Date.now() - timestamp > 1000 * 60 * 60 * 2) {
    const file = homework.files.find((file) => file._id.toString() === fileID);

    const videoSize = fs.statSync(`${homeworkDir}/${file.path}`).size;
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    return {
      videoSize,
      start,
      end,
      videoPath: `${homeworkDir}/${file.path}`,
    };
    // }
  }
};
