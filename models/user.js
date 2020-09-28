const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  name: String,
  roll_no: String,
  branch: String,
  trips: [
    {
      _id: false,
      train_name: String,
      train_no: String,
      date: Date,
      departure: String,
      arrival: String,
    },
  ],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
