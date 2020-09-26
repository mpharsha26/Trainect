const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

var userSchema = new mongoose.Schema({
	googleId: String,
	facebookId: String,
	name: String,
	roll_no: String,
	branch: String,
	train_no: String,
	date: Date,
	departure: String,
	arrival: String,
});

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);