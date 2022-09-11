const { getAll } = require("../services/homework.service");

exports.index = async (_req, res) => {
  return res.json({ data: await getAll() });
};
