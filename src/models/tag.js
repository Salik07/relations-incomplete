const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
  ],
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
