const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

app.get("/api/student", async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(200).json({
      status: "success",
      message: "Get All Student",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

app.get("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(200).json({
      status: "success",
      message: "Student Found",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

app.post("/api/student", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Success Add New Student",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

app.put("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);

    if (!student) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found",
      });
    }

    const updatedStudent = await Student.findById(id);
    res.status(500).json({
      status: "success",
      message: "Success Update Student data",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});

app.delete("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
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
