const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    train_name: String,
    train_no: String,
    date: Date,
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         }
    ]
});

module.exports = mongoose.model("Trip", tripSchema);