const express = require("express");

const Image = require("../models/image");
const Tutorial = require("../models/tutorial");

const router = new express.Router();

router.post("/images", async (req, res) => {
  const image = new Image(req.body);

  try {
    const docImage = await image.save();

    // First Method
    // const tutorial = await Tutorial.findById("5f871023cb64b81308f0f044");

    // tutorial.images = tutorial.images.concat({
    //   // _id: docImage._id,
    //   url: docImage.url,
    //   caption: docImage.caption,
    // });

    // await tutorial.save();

    // Second Method
    // const tutorial = await Tutorial.findById("5f87124ae7d7d13664e58cbb");

    // tutorial.images = tutorial.images.concat({
    //   _id: docImage._id,
    //   url: docImage.url,
    //   caption: docImage.caption,
    // });

    // await tutorial.save();

    // Third Method
    await Tutorial.findByIdAndUpdate(
      "5f8737cb655c613510a4ed0b",
      {
        $push: {
          images: {
            _id: docImage._id,
            url: docImage.url,
            caption: docImage.caption,
          },
        },
      },
      {
        new: true,
      }
    );

    res.status(201).send(docImage);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/images", async (req, res) => {
  try {
    const images = await Image.find();

    res.send(images);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
