const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  train_name: String,
  train_no: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  departure: String,
  arrival: String,
});

module.exports = mongoose.model("Trip", tripSchema);
