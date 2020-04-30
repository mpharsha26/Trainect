var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Train = require("../models/train");

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	req.body.user.roll_no = req.body.user.roll_no.toUpperCase();
	User.findOne({roll_no:req.body.user.roll_no, train_no: req.body.user.train_no}, function(err,foundUser){
		console.log(foundUser);
		if(err)
			res.redirect("/");
		else{
			if(foundUser){
				res.redirect("/show/" + req.body.user.roll_no + "/" + req.body.user.train_no);
			}
			else{
				User.create(req.body.user, function(err, newUser){
					if(err)
						console.log(err);
					else{
						var no   = newUser.train_no;
						var user = newUser._id;
						var date = newUser.date;
						var newTrain = { no : no , date: date, user : user};
						Train.create(newTrain, function(err, newTrain){
							if(err)
								console.log(err);
							else
								res.redirect("/show/" + newUser.roll_no + "/" + newUser.train_no);
						});
					};
				});
			}
		}
	});
});

module.exports = router;