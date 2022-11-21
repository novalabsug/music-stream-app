const mongoose = require("mongoose");

const musicSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  artist: {
    type: String,
  },
  album: {
    type: String,
  },
  trackLength: {
    type: String,
  },
  filename: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

const Music = mongoose.model("music", musicSchema);

module.exports = Music;
