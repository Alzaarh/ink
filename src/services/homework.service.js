const HomeworkCategory = require("../models/homework.model");

exports.getAll = async () => {
  return await HomeworkCategory.find({}).sort({
    order: "asc",
    "homeworks.order": "asc",
  });
};
