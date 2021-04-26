const express = require("express");
const mongoose = require("mongoose");

const Tutorial = require("../models/tutorial");
const Tag = require("../models/tag");

const { convertToObjectID } = require("../helpers");

const router = new express.Router();

// router.post("/tutorials", async (req, res) => {
//   const tutorial = new Tutorial(req.body);

//   try {
//     await tutorial.save();

//     res.status(201).send(tutorial);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.post("/tutorials", async (req, res) => {
//   const tutorial = new Tutorial(req.body);

//   try {
//     const newTutorial = await tutorial.save();

//     await Tag.findByIdAndUpdate(
//       req.body.tags,
//       {
//         $push: {
//           tutorials: newTutorial._id,
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     res.status(201).send(tutorial);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.post("/tutorials", async (req, res) => {
  const tutorial = new Tutorial(req.body);

  try {
    const newTutorial = await tutorial.save();

    if (req.body && req.body.tags) {
      let tags = await Tag.find({
        _id: { $in: convertToObjectID([...req.body.tags]) },
      });

      tags = tags.map((tagData) => {
        tagData.tutorials = [...tagData.tutorials, newTutorial._id];

        return tagData;
      });

      tags.forEach(async (td) => await td.save());
    }

    res.status(201).send(tutorial);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/tutorials/:id", async (req, res) => {
  const tutorialID = req.params.id;
  const tagIDs = convertToObjectID([...req.body.tags]);

  try {
    const tutorial = await Tutorial.findById(tutorialID);

    tutorial.tags = [...tutorial.tags, ...tagIDs];
    await tutorial.save();

    let tagsData = await Tag.find({ _id: { $in: tagIDs } });

    tagsData = tagsData.map((tagData) => {
      tagData.tutorials = [...tagData.tutorials, tutorialID];

      return tagData;
    });

    tagsData.forEach(async (td) => await td.save());

    res.status(200).send(tutorial);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tutorials", async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    // .populate("category")
    // .populate("comments")
    // .populate("tags", "-tutorials")
    // .exec();

    res.send(tutorials);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tutorials-in-category", async (req, res) => {
  try {
    const tutorials = await Tutorial.find({
      category: "5f87476593214b198c9e56f8",
    })
      .populate("category", "name -_id")
      .select("-comments -images -__v");

    res.send(tutorials);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
