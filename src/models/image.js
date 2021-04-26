const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: {
    type: String,
  },
  url: {
    type: String,
  },
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
