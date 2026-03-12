const lectureTable = require("../models/lectureTable");
const bcrypt = require("bcryptjs");

const router = require("../routes");

const manageLectureCtrl = {
  //Lecture Data Post
  createLecturerData: async (req, res) => {
    try {
      const {
        email,
        username,
        password,
        lecturerid,
        lecturername,
        faculty,
        department,
        profilepic,
        first_day_at_work,
        modulename,
        gender,
      } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Something is wrong");
      }

      const newLecturerData = new lectureTable({
        email,
        username,
        password: hashPassword,
        lecturerid,
        lecturername,
        faculty,
        department,
        profilepic,
        first_day_at_work,
        modulename,
        gender,
      });
      await newLecturerData.save();

      res.json({ msg: "Created" });
    } catch (error) {
      console.log("error", error);
    }
  },

  //Get Lecture Data
  getLecture: async (req, res) => {
    try {
      let lecturetables = await lectureTable.find();
      console.log("All LectureData Fetched");
      res.send(lecturetables);
      // console.log("Hiiiii", lecturetables);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  //update Lecture data
  updateLectureData: async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const lecturer = await lectureTable.findOne({ _id: id });
    if (!lecturer) return res.status(404).json({ msg: "No Lecturer" });

    try {
      const updateLecData = await lectureTable.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      if (!updateLecData) {
        return res.status(404).json({ msg: "Lecturer not found" });
      }
      return res.status(200).json({ msg: "Lecturer details updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  },

  //Lecturer data get from the lecture_id
  getIdLecturer: async (req, res) => {
    const { id } = req.params;
    console.log("lecturer id", id);
    try {
      const lec = await lectureTable.findById({ _id: id });
      if (!lec) return res.status(404).json({ msg: "No Lecturer" });
      console.log("Lecturer data Fetched");
      res.send(lec);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = manageLectureCtrl;
