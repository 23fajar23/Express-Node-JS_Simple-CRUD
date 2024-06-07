const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

const uri =
  "mongodb+srv://admin:1password1@backenddb.ghbzqtm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
