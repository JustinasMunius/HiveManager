const mongoose = require("mongoose");

const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    content: String
  },{ timestamps: true })
);

module.exports = Note;