const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");


router.get("/trips", ensureAuthenticated, function (req, res){
    res.render("trips");
})

router.get("/trips/:id", ensureAuthenticated, function (req, res){
    
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  

module.exports = router;