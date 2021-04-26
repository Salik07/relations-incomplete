const mongoose = require("mongoose");

const convertToObjectID = (IDs) => {
  return IDs.map((id) => mongoose.Types.ObjectId(id));
};

module.exports = {
  convertToObjectID,
};
