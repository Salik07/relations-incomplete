const mongoose = require("mongoose");

const identifierSchema = new mongoose.Schema({
  cardCode: {
    type: String,
    uppercase: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});

const Identifier = mongoose.model("Identifier", identifierSchema);

module.exports = Identifier;
