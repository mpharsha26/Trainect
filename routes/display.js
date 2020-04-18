var express = require("express");
var router = express.Router();


router.get("/display", function(req, res){
	res.render("display");
});

router.post("/display", function(req, res){
	req.body.roll_no = req.body.roll_no.toUpperCase();
	res.redirect("/show/" + req.body.roll_no + "/" + req.body.train_no);
});

module.exports = router;