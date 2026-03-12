const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  faculty: String,
  department: String,
  module: String,
  batch: String,
  feedback: String,
  studentid: String,
  lecturername: String,
  modulecode: String,
  modulename: String
});

const feedBackTable = mongoose.model("feedBackTable", feedBackSchema);

module.exports = feedBackTable;
