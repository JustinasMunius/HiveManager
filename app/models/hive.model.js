const mongoose = require("mongoose");

const Hive = mongoose.model(
  "Hive",
  new mongoose.Schema({
    title: String,
    keeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  })
);

module.exports = Hive;