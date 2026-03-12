const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  lecturerid: String,
  lecturername: String,
  faculty: String,
  department: String,
  profilepic: String,
  first_day_at_work: String,
  modulename: String,
  gender: String,
});

const lectureTable = mongoose.model("lectureTable", lectureSchema);

module.exports = lectureTable;
