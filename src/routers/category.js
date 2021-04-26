const express = require("express");

const Category = require("../models/category");

const router = new express.Router();

router.post("/category", async (req, res) => {
  const category = new Category(req.body);

  try {
    await category.save();

    res.send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get("/category", async (req, res) => {
//     try {

//     } catch (err) {

//     }
// });

module.exports = router;
