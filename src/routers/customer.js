const express = require("express");

const Customer = require("../models/customer");

const router = new express.Router();

router.post("/customers", async (req, res) => {
  const customer = new Customer(req.body);

  try {
    await customer.save();

    res.status(201).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();

    res.send(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
