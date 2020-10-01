const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");

router.get("/trips", ensureAuthenticated, function (req, res) {
  Trip.find({ traveller: req.user._id }, function (err, trips) {
    res.render("trips", { trips: trips });
  });
});

router.get("/trips/:id", ensureAuthenticated, function (req, res) {
  Trip.findById(req.params.id, function (err, foundTrip) {
    if (err) {
      console.log(err);
      res.redirect("/trips");
    } else {
      Trip.find({ date: foundTrip.date, train_no: foundTrip.train_no })
        .populate("traveller")
        .exec(function (err, trips) {
          //console.log(trips);
          res.render("show", { trips: trips });
        });
    }
  });
});

router.get("/trips/:id/edit", ensureAuthenticated, function (req, res) {
  Trip.findById(req.params.id, function (err, trip) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.render("edit", { trip: trip });
    }
  });
});

router.put("/trips/:id", ensureAuthenticated, function (req, res) {
  Trip.findByIdAndUpdate(req.params.id, req.body.trip, function (err, trip) {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect("/trips");
    }
  });
});

router.delete("/trips/:id", ensureAuthenticated, function (req, res) {
  Trip.findByIdAndDelete(req.params.id, function (err, trip) {
    if (err) {
      console.log(err);
      res.redirect("/trips");
    } else {
      res.redirect("/trips");
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
