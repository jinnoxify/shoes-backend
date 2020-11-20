const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const admin = require("./config/database");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
const fetchRouter = require("./components/fetch/routes");

app.use("/", indexRouter);
app.use("/fetch", fetchRouter);

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

module.exports = app;
