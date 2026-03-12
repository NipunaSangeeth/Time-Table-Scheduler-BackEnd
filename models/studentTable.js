const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  faculty: String,
  department: String,
  batch: String,
  studentname: String,
  studentid: String,
  profilepic: String,
  degree: String,
  gender: String,
});

const studentTable = mongoose.model("studentTables", studentSchema);

module.exports = studentTable;
