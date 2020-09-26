const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/login", function (req, res){
    res.render('login');
  });
  
  //// routes for auth using Google
  router.get("/auth/google",
    passport.authenticate('google', { scope: ["profile"] })
  );
  
  router.get('/auth/google/home', 
    passport.authenticate('google', { failureRedirect: '/signup' }),
    function(req, res) {
      // Successful authentication, redirect home.
      //console.log(req.user);
      res.redirect('/');
    });
  
  //// routes for auth using Facebook
  
  router.get('/auth/facebook',
    passport.authenticate('facebook'));
  
  router.get('/auth/facebook/home',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
  
  router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  module.exports = router;