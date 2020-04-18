var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req,res){
	res.render("home");
});

router.get("/show/:roll_no/:train_no", function(req, res){
		User.findOne({ roll_no: req.params.roll_no , train_no: req.params.train_no }, function(err, user){
			if(err){
				console.log(err);
				res.send("Oops!! Check your url once again ...")
			}
			else{
				User.find({train_no: user.train_no, date: user.date}, function(err, requiredUsers){
					if(err)
						console.log(err);
					else
						res.render("show", { users: requiredUsers, ignoredRollNo: req.params.roll_no });
				});
			}
		});
});

module.exports = router;