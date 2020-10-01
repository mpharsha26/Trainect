var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("home");
});

router.get("*", function (req, res) {
  res.render("error");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
