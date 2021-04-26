const express = require("express");
require("./db/mongoose");

const customerRouter = require("./routers/customer.js");
const identifierRouter = require("./routers/identifier");
const tutorialRouter = require("./routers/tutorial");
const imageRouter = require("./routers/image");
const commentRouter = require("./routers/comment");
const categoryRouter = require("./routers/category");
const tagRouter = require("./routers/tag");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(customerRouter);
app.use(identifierRouter);
app.use(tutorialRouter);
app.use(imageRouter);
app.use(commentRouter);
app.use(categoryRouter);
app.use(tagRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
