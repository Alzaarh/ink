const { create } = require("../services/feedback.service");

exports.create = (req, res) => {
  create({ file: req.file, details: req.body.details });
  res.json({});
};
