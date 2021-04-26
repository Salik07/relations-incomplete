const express = require("express");

const Comment = require("../models/comment");
const Tutorial = require("../models/tutorial");

const router = new express.Router();

router.post("/comments", async (req, res) => {
  const comment = new Comment(req.body);

  try {
    const newComment = await comment.save();

    await Tutorial.findByIdAndUpdate(
      "5f88ba7d851a1d283c249789",
      {
        $push: {
          comments: newComment._id,
        },
      },
      {
        new: true,
      }
    );

    res.status(201).send(newComment);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();

    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
