const mongoose = require("mongoose");

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    content: String,
    level: Number,
    hive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hive"
    }
  },{ timestamps: true })
);

module.exports = Notification;