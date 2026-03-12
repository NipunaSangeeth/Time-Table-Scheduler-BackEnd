const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  faculty: String,
  department: String,
  batch: String,
  modulename: String,
  modulecode: String,
  lecturername: String,
  lecturerid: String,
});

const moduleTable = mongoose.model("moduleTables", moduleSchema);

module.exports = moduleTable;
