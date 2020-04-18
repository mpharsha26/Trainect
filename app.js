var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	User = require("./models/user"),
	Train = require("./models/train"),
	registerRoutes = require("./routes/register"),
	displayRoutes = require("./routes/display"),
	indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost:27017/trai_n_ect",{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connect("mongodb+srv://trainect_mp:password@mp_trainect@cluster0-vozod.mongodb.net/trainectApp?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static("public"));

app.use(registerRoutes);
app.use(displayRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
	console.log("Trainect server started");
});