var mongoose = require("mongoose");

var trainSchema = new mongoose.Schema({
	no : String,
	date : String,
	user : {
		type: mongoose.Schema.Types.ObjectId,
		ref : "User"
	}
});

module.exports = mongoose.model("Train", trainSchema);
