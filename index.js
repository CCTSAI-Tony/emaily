const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send({ bye: "hi youll" });
});

const PORT = process.env.PORT || 5000; //dev
app.listen(PORT);
