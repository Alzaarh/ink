const asyncHandler = require("express-async-handler");
const { getAll, getOne } = require("../services/printable.service");
const { printableDir } = require("../configs/storage.config");

exports.index = asyncHandler(async (_req, res) => {
  const printables = await getAll();

  res.json({ data: printables });
});

exports.show = asyncHandler(async (req, res) => {
  const file = await getOne(req.params.fileID);

  if (!file) {
    return res.status(404).end();
  }

  const filePath = `${process.cwd()}/${printableDir}/${file.path}`;

  if (req.query.download === "1") {
    return res.download(filePath);
  }
  res.sendFile(filePath);
});
