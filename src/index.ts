import express, { Application } from "express";
const port = 8000,
  bodyParser = require("body-parser"),
  app: Application = express();

app.use(
  bodyParser.json({
    limit: "100mb",
  })
);

const APIRoutes = require("./routes/index");
new APIRoutes(app);

app.listen(port, "0.0.0.0", () => {
  console.log(`Node server up and running on port ${port}`);
});
