const express = require("express");

const Tag = require("../models/tag");
const Tutorial = require("../models/tutorial");

const { convertToObjectID } = require("../helpers");

const router = new express.Router();

// router.post("/tags", async (req, res) => {
//   const tag = new Tag(req.body);

//   try {
//     await tag.save();

//     res.status(201).send(tag);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.post("/tags", async (req, res) => {
//   const tag = new Tag(req.body);

//   try {
//     const newTag = await tag.save();

//     await Tutorial.findByIdAndUpdate(
//       req.body.tutorials,
//       {
//         $push: {
//           tags: newTag._id,
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     res.status(201).send(tag);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.post("/tags", async (req, res) => {
  const tag = new Tag(req.body);

  try {
    const newTag = await tag.save();

    if (req.body && req.body.tutorials) {
      let tutorials = await Tutorial.find({
        _id: { $in: convertToObjectID([...req.body.tutorials]) },
      });

      tutorials = tutorials.map((tutorialData) => {
        tutorialData.tags = [...tutorialData.tags, newTag._id];

        return tutorialData;
      });

      tutorials.forEach(async (td) => await td.save());
    }

    res.status(201).send(tag);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/tags/:id", async (req, res) => {
  const tagID = req.params.id;
  const tutorialIDs = convertToObjectID([...req.body.tutorials]);

  try {
    const tag = await Tag.findById(tagID);

    tag.tutorials = [...tag.tutorials, ...tutorialIDs];
    await tag.save();

    let tutorials = await Tutorial.find({ _id: { $in: tutorialIDs } });

    tutorials = tutorials.map((tutorialData) => {
      tutorialData.tags = [...tutorialData.tags, tagID];

      return tutorialData;
    });

    tutorials.forEach(async (td) => await td.save());

    res.status(200).send(tag);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    // .populate("tutorials", "-tags").exec();

    res.send(tags);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
