const lecturehallTable = require("../models/lecturehall");
const router = require("../routes");

const managelecturehallCtrl = {
  //Lecture hall data post
  createhallData: async (req, res) => {
    try {
      const { building, halls } = req.body;
      const newLecturehallData = new lecturehallTable({ building, halls });
      await newLecturehallData.save();

      res.json({ msg: "Created" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ msg: "Failed to create lecture hall", error });
    }
  },

  //Get Lecture Hall Data
  getLectureHalls: async (req, res) => {
    try {
      let lecturehalltables = await lecturehallTable.find();
      console.log("All Lecture Hall Data Fetched");
      res.send(lecturehalltables);
      console.log("Lecture hall Dataa", lecturehalltables);
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },
};

module.exports = managelecturehallCtrl;
