var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	roll_no: String,
	branch: String,
	train_no: String,
	date: String,
	departure: String,
	arrival: String,
});

module.exports = mongoose.model("User", userSchema);