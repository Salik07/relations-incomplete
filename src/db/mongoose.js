const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/relations", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection error", err);
  });
