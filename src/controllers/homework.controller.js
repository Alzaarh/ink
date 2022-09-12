const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { getAll, getOne, stream } = require("../services/homework.service");

exports.index = asyncHandler(async (_req, res) => {
  const data = await getAll();

  res.json({ data });
});

exports.show = asyncHandler(async (req, res) => {
  const homework = await getOne(req.params.fileID);

  if (!homework) {
    return res.status(404).end();
  }
  res.json({ data: homework });
});

exports.stream = asyncHandler(async (req, res) => {
  const info = await stream(
    req.params.fileID,
    req.get("range"),
    req.query.code
  );

  if (!info) {
    return res.status(404).end();
  }

  // send correct response
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
});
