const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, required: true },
  seenByUsers: [mongoose.ObjectId],
});

const homeworkCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  homeworks: [homeworkSchema],
});

const HomeworkCategory = mongoose.model(
  "HomeworkCategory",
  homeworkCategorySchema
);

module.exports = HomeworkCategory;

const video = {
  title: "تکلیف اول",
  order: 1,
  homeworks: [
    { title: "ویدیو اول", order: 1, path: "1.mp4" },
    { title: "ویدیو دوم", order: 2, path: "1.mp4" },
    { title: "ویدیو سوم", order: 3, path: "1.mp4" },
  ],
};
