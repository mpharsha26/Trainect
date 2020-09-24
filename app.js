const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  User = require("./models/user"),
  Train = require("./models/train"),
  registerRoutes = require("./routes/register"),
  displayRoutes = require("./routes/display"),
  indexRoutes = require("./routes/index");
require("dotenv").config();


mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static("public"));

app.use(registerRoutes);
app.use(displayRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, function () {
  console.log("Trainect server is up !!");
});
