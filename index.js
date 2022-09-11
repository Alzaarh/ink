require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbConfig = require("./src/configs/db.config");
const courseRoutes = require("./src/routes/course.route");
const transactionRoutes = require("./src/routes/transaction.route");
const subscriberRoutes = require("./src/routes/subscriber.route");
const visitorRoutes = require("./src/routes/visitor.route");
const contactRoutes = require("./src/routes/contact.route");
const userRoutes = require("./src/routes/user.route");
const videoRoutes = require("./src/routes/video.route");
const feedbackRoutes = require("./src/routes/feedback.route");

const app = express();
const port = process.env.PORT || 3000;
const dbUri = `mongodb://127.0.0.1:27017/ink`;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/courses", courseRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/feedbacks", feedbackRoutes);

mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Ink Project is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
