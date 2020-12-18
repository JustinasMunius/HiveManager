const mongoose = require("mongoose");

const Data = mongoose.model(
  "Data",
  new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    pressure: Number,
    weight: Number,
    hive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hive"
    }
  },{ timestamps: true })
);

module.exports = Data;