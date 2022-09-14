const faker = require("@faker-js/faker").faker;
const mongoose = require("mongoose");
const Printable = require("./src/models/printable.model");
const Homework = require("./src/models/homework.model");
const Video = require("./src/models/video.model");
const FeedbackSession = require("./src/models/feedbackSession.model");

faker.locale = "fa";

const seed = async () => {
  const printables = [];
  for (let i = 0; i < 4; i++) {
    printables.push({
      title: faker.lorem.words(),
      order: i + 1,
      files: [
        { title: faker.lorem.word(), order: 1, path: "1.pdf" },
        { title: faker.lorem.word(), order: 2, path: "1.pdf" },
        { title: faker.lorem.word(), order: 3, path: "1.pdf" },
        { title: faker.lorem.word(), order: 4, path: "1.pdf" },
      ],
    });
  }
  const newPrintables = await Printable.insertMany(printables);
  const newPrintableFiles = [];
  newPrintables.forEach((printable) => {
    printable.files.forEach((file) => {
      newPrintableFiles.push(file);
    });
  });

  const homeworks = [];
  for (let i = 0; i < 5; i++) {
    homeworks.push({
      title: faker.lorem.words(),
      order: i + 1,
      files: [
        {
          title: faker.lorem.word(),
          order: 1,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 2,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 3,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 4,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
        },
      ],
    });
  }
  const newHomeworks = await Homework.insertMany(homeworks);
  const newHomeworkFiles = [];
  newHomeworks.forEach((homework) => {
    homework.files.forEach((file) => {
      newHomeworkFiles.push(file);
    });
  });

  const videos = [];
  for (let i = 0; i < 10; i++) {
    videos.push({
      title: faker.lorem.words(),
      order: i + 1,
      files: [
        {
          title: faker.lorem.word(),
          order: 1,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
          homeworks: faker.helpers.arrayElements(newHomeworkFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 1,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
          homeworks: faker.helpers.arrayElements(newHomeworkFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 1,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
          homeworks: faker.helpers.arrayElements(newHomeworkFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 1,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
          homeworks: faker.helpers.arrayElements(newHomeworkFiles, 3),
        },
        {
          title: faker.lorem.word(),
          order: 1,
          path: "1.mp4",
          printables: faker.helpers.arrayElements(newPrintableFiles, 3),
          homeworks: faker.helpers.arrayElements(newHomeworkFiles, 3),
        },
      ],
    });
  }
  await Video.insertMany(videos);

  const feedbackSessions = [];
  for (let i = 0; i < 20; i++) {
    feedbackSessions.push({
      title: faker.lorem.words(),
      path: "1.mp4",
      printables: faker.helpers.arrayElements(newPrintableFiles, 2),
    });
  }
  await FeedbackSession.insertMany(feedbackSessions);
};

const dbUri = `mongodb://127.0.0.1:27017/ink`;

mongoose
  .connect(dbUri)
  .then(() => {
    return seed();
  })
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
  });
