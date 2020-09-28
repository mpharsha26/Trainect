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
        //console.log(foundTrip);
        res.render("show", {users: foundTrip.users});
      }
    });
});

router.get("/trips/:id/edit", ensureAuthenticated, function (req, res){
  res.render("edit");
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