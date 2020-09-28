const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");

router.get("/register", ensureAuthenticated, function (req, res) {
  res.render("register");
});

router.post("/register", ensureAuthenticated, function (req, res) {
  req.body.roll_no = req.body.roll_no.toUpperCase();
  Trip.find(
    { date: req.body.date, train_no: req.body.train_no },
    {
      users: {
        $elemMatch: {
          name: req.user.name,
        },
      },
    },
    function (err, foundTrip) {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        if (foundTrip.length != 0) {
          console.log(foundTrip);
          res.render("existentTrip");
        } else {
          Trip.find(
            { train_no: req.body.train_no, date: req.body.date },
            function (err, trip) {
              if (err) {
                console.log(err);
                res.redirect("/");
              } else {
                if (trip.length != 0) {
                  trip.users.push(req.user._id);
                } else {
                  var trip = new Trip({
                    train_name: req.body.train_name,
                    train_no: req.body.train_no,
                    date: req.body.date,
                  });
                }
                trip.users.push(req.user._id);
                trip.save(function (err, trip) {
                  if (err) {
                    console.log(err);
                    res.redirect("/");
                  } else {
                    User.findById(req.user._id, function (err, user) {
                      user.trips.push({
                        train_name: req.body.train_name,
                        train_no: req.body.train_no,
                        date: req.body.date,
                        departure: req.body.departure,
                        arrival: req.body.arrival,
                      });
                      user.save(function (err, user) {
                        if (err) {
                          console.log(err);
                          res.redirect("/");
                        } else {
                          //res.redirect("/trips/" + trip._id);
                          res.redirect("/trips");
                        }
                      });
                    });
                  }
                });
              }
            }
          );
        }
      }
    }
  );
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
