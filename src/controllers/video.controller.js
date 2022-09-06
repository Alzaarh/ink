const fs = require("fs");

const { getAll, create, getOne } = require("../services/video.service");

exports.index = async (_req, res) => {
  return res.json({ data: await getAll() });
};

exports.show = async (req, res) => {
  const info = await getOne(
    req.params.categoryID,
    req.params.id,
    req.get("range")
  );
  if (!info) {
    return res.status(404).json({});
  }
  const contentLength = info.end - info.start + 1;
  const headers = {
    "Content-Range": `bytes ${info.start}-${info.end}/${info.videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(info.videoPath, {
    start: info.start,
    end: info.end,
  });
  videoStream.pipe(res);
};

exports.create = async (req, res) => {
  await create(req.body);
  res.status(201).json({});
};
