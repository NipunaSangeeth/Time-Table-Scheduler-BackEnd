const mongoose = require("mongoose");

const lecturehallSchema = new mongoose.Schema({
  building: {
    type: String,
    required: true,
  },
  halls: {
    type: [String],
    required: true,
  },
});

const lecturehallTable = mongoose.model("lectureHallTable", lecturehallSchema);

module.exports = lecturehallTable;
