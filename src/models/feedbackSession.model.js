const mongoose = require("mongoose");

const feedbackSessionSchema = new mongoose.Schema({
  title: String,
  path: String,
  printables: [mongoose.Schema.Types.ObjectId],
});

const FeedbackSession = mongoose.model(
  "feedbackSession",
  feedbackSessionSchema
);

module.exports = FeedbackSession;
