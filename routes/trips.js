const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");


router.get("/trips", ensureAuthenticated, function (req, res){
    res.render("trips");
})

router.get("/trips/:id", ensureAuthenticated, function (req, res){
  Trip.findById(req.params.id).populate("users").exec(function (err, foundTrip) { 
      if (err) {
        console.log(err);
        res.redirect("/trips");
      }
      else {
        res.render("show", {users: foundTrip.users});
      }
    });
});

router.get("/trips/:id/edit", ensureAuthenticated, function (req, res){
  currentUser = req.user;
  for(let i = 0; i<currentUser.trips.length; i++){
    let trip = currentUser.trips[i];
    if (trip.id.equals(req.params.id)){
      currentUserTrip = {
        train_name: currentUser.trips[i].train_name,
        train_no: currentUser.trips[i].train_no,
        date: currentUser.trips[i].date,
        departure: currentUser.trips[i].departure,
        arrival: currentUser.trips[i].arrival
      }
    }
  }
  res.render("edit", {currentUserTrip: currentUserTrip});
})

router.put("/trips/:id", ensureAuthenticated, function (req, res){

});

router.delete("/trips/:id", ensureAuthenticated, function (req, res){

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  

module.exports = router;