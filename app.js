const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      flash = require("connect-flash"),
      User = require("./models/user"),
      Trip = require("./models/trip"),
      registerRoutes = require("./routes/register"),
      displayRoutes = require("./routes/display"),
      indexRoutes = require("./routes/index"),
      loginRoutes = require("./routes/login"),
      tripsRoutes = require("./routes/trips");
      session = require('express-session'),
      passport = require("passport"),
      GoogleStrategy = require("passport-google-oauth20").Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
      methodOverride = require("method-override");

// enable usuage of env variable
require("dotenv").config();      

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static("public"));
app.use(methodOverride('_method'));


app.use(
  session({
    secret: "MP's little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

///////////////// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      //console.log(profile);
      User.findOrCreate({ googleId: profile.id, name: profile.displayName }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//////////// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.CALLBACK_URL_FACEBOOK
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id, name: profile.displayName }, function (err, user) {
    //console.log(profile);
    return cb(err, user);
  });
}
));


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  //res.locals.success = req.flash('success');
  //res.locals.error = req.flash('error');
  next();
});

// usuage of routes
app.use(registerRoutes);
app.use(displayRoutes);
app.use(loginRoutes);
app.use(tripsRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, function () {
  console.log("Trainect server is up !!");
});
