const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// if (process.env.NODE_ENV !== "production") {
require("dotenv").config({ path: "config/config.env" });
// }
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});
// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");
const story = require("./routes/story");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", story);

module.exports = app;
