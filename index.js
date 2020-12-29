const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ truquito: true });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running at ${process.env.PORT || 3000}`);
});
