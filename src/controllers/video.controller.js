const fs = require("fs");

const { getAll, create, getOne, stream } = require("../services/video.service");

exports.index = async (_req, res) => {
  res.json({ data: await getAll() });
};

exports.stream = async (req, res) => {
  const info = await stream(
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

exports.show = async (req, res) => {
  const video = await getOne(req.params.categoryID, req.params.id);
  if (!video) {
    return res.status(404).json({});
  }
  res.json({ data: video });
};

exports.create = async (req, res) => {
  await create(req.body);
  res.status(201).json({});
};
