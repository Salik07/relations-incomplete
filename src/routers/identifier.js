const express = require("express");

const Identifier = require("../models/identifier");

const router = new express.Router();

router.post("/identifiers", async (req, res) => {
  const identifier = new Identifier(req.body);

  try {
    await identifier.save();

    res.status(201).send(identifier);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/identifiers", async (req, res) => {
  try {
    const identifiers = await Identifier.find()
      .populate("customer", "-__v")
      .select("-__v");

    res.send(identifiers);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
