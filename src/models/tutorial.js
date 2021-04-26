const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  author: {
    type: String,
  },
  images: [],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  //   images: [
  //     {
  //       url: {
  //         type: String,
  //       },
  //       caption: {
  //         type: String,
  //       },
  //     },
  //   ],
});

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial;
