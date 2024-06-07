const express = require("express");
const mongoose = require("mongoose");
const studentRoute = require("./routes/student.route.js");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/student", studentRoute);

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
