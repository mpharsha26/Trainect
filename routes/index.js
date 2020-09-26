var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function (req, res) {
  res.render("home");
});

router.get("/show/:roll_no/:train_no", ensureAuthenticated, function (req, res) {
    User.findOne({ roll_no: req.params.roll_no, train_no: req.params.train_no }, function (err, user) {
        if (user == null) {
          res.render("unregistered");
        } else {
          	User.find({ train_no: user.train_no, date: user.date }, function (err,requiredUsers) {
				if (err){
					res.redirect("/");
				} else {
					res.render("show", {users: requiredUsers, ignoredRollNo: req.params.roll_no,});
				}
          });
        }
      }
    );
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
