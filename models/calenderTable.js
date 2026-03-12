const mongoose = require("mongoose");

const calenderSchema = new mongoose.Schema({
  faculty: String,
  department: String,
  batch: String,
  modulename: String,
  lecturername: String,
  building: String,
  halls: String,
  lecture_date: String,
  start_time: String,
  end_time:String,
  year:String,
});

const calenderTable = mongoose.model("calenderTable", calenderSchema);
// module.exports = mongoose.model("calenderTable", calenderSchema);

module.exports = calenderTable;
