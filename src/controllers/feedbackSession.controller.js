const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  getAll,
  getOne,
  stream,
} = require("../services/feedbackSession.service");

exports.index = asyncHandler(async (req, res) => {
  const feedbackSessions = await getAll();

  res.json({ data: feedbackSessions });
});

exports.show = asyncHandler(async (req, res) => {
  const feedbackSession = await getOne(req.params.id);

  if (!feedbackSession) {
    return res.status(404).end();
  }
  res.json({ data: feedbackSession });
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
