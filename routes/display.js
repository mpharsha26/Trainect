var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/display", ensureAuthenticated, function (req, res) {
  User.findOne({ googleId: req.user.googleId }, function (err, foundUser) {
    if (err) {
      res.redirect("/");
    } else {
      if (foundUser) {
        res.redirect("/show/" + req.user.roll_no + "/" + req.user.train_no);
      } else {
        res.render("unregistered");
      }
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
