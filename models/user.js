const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  name: String,
  roll_no: {
    type: String,
    uppercase: true
  },
  branch: {
    type: String,
    uppercase: true
  }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
