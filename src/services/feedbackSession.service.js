const fs = require("fs");
const FeedbackSession = require("../models/feedbackSession.model");
const Printable = require("../models/printable.model");
const { feedbackSessionDir } = require("../configs/storage.config");

exports.getAll = async () => {
  const feedbackSessions = await FeedbackSession.find().sort({ _id: "asc" });

  return feedbackSessions;
};

exports.getOne = async (id) => {
  const feedbackSession = await FeedbackSession.findById(id).lean();

  if (feedbackSession) {
    const printables = await Printable.find();

    fileIDs = feedbackSession.printables;
    feedbackSession.printables = [];

    for (let i = 0; i < fileIDs.length; i++) {
      for (let j = 0; j < printables.length; j++) {
        const file = printables[j].files.find(
          (file) => file._id.toString() === fileIDs[i].toString()
        );

        if (file) {
          feedbackSession.printables.push(file);
        }
      }
    }

    return feedbackSession;
  }
};

exports.stream = async (id, range) => {
  const feedbackSession = await FeedbackSession.findById(id);

  if (feedbackSession) {
    const videoSize = fs.statSync(
      `${feedbackSessionDir}/${feedbackSession.path}`
    ).size;
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    return {
      videoSize,
      start,
      end,
      videoPath: `${feedbackSessionDir}/${feedbackSession.path}`,
    };
  }
};
