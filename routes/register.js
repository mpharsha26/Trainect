const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/register", ensureAuthenticated, function (req, res) {
    res.render("register");
});

router.post("/register", ensureAuthenticated, function (req, res) {
  req.body.user.roll_no = req.body.user.roll_no.toUpperCase();
  User.findOne({ roll_no: req.body.user.roll_no, train_no: req.body.user.train_no }, function (err, foundUser) {
      //console.log(foundUser);
      if (err) {
        res.redirect("/");
      }
      else {
        if (foundUser) {
          res.redirect(
            "/show/" + req.body.user.roll_no + "/" + req.body.user.train_no
          );
        } else {
          User.findOne({googleId: req.user.googleId}, function(err, user){
            if (err){
              console.log(err);
            }
            else{
              console.log(user, req.user);
              user.name = req.body.user.name;
              user.roll_no = req.body.user.roll_no;
              user.branch = req.body.user.branch;
              user.train_no = req.body.user.train_no;
              user.date = req.body.user.date;
              user.departure = req.body.user.departure;
              user.arrival = req.body.user.arrival;
              user.save(function(err, savedUser){
                if (err){
                  console.log(err);
                }
                else{
                  //console.log("user saved successfully", savedUser);
                  res.redirect("/show/" + savedUser.roll_no + "/" + savedUser.train_no);
                }
              });
            }
          });
        }
      }
    }
  );
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
