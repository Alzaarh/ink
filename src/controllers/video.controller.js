const { getAll } = require("../services/video.service");

exports.index = async (_req, res) => {
  return res.json({ data: await getAll() });
};
