const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");

router.get("/register", ensureAuthenticated, function (req, res) {
  res.render("register");
});


router.post("/register", ensureAuthenticated, function (req, res){
  Trip.find({train_no: req.body.trip.train_no, date: req.body.trip.date, user: req.user._id}, function (err, foundTrip){
    if (err){
      console.log(err);
      res.redirect("/");
    }
    else{
      if(foundTrip.length == 1){
        console.log(foundTrip);
        res.render("existentTrip", {trip: foundTrip[0]});
      }
      else{
        Trip.create(req.body.trip, function (err, trip){
            if (err)
              console.log(err);
            else{
              trip.traveller = req.user._id;
              trip.save();
              currentUser = req.user;
              currentUser.roll_no = req.body.roll_no;
              currentUser.branch = req.body.branch;
              currentUser.save();
              res.redirect("/trips/" + trip._id);
            }
        });
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
