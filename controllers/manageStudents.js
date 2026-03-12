const studentTable = require("../models/studentTable");
const bcrypt = require("bcryptjs");

const router = require("../routes");

const manageStudentCtrl = {
  //post student data
  createStudentData: async (req, res) => {
    try {
      const {
        email,
        username,
        password,
        faculty,
        department,
        batch,
        studentname,
        studentid,
        profilepic,
        degree,
      } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Something is wrong");
      }

      const newStudentData = new studentTable({
        email,
        username,
        password: hashPassword,
        faculty,
        department,
        batch,
        studentname,
        studentid,
        profilepic,
        degree,
      });
      await newStudentData.save();

      res.json({ msg: "Created" });
    } catch (error) {
      console.log("error", error);
    }
  },

  //update student data
  updateStudentData: async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const student = await studentTable.findOne({ _id: id });
    if (!student) return res.status(404).json({ msg: "No student" });

    try {
      const updatedData = await studentTable.findOneAndUpdate(
        { _id: id }, // Filter by ID
        { $set: req.body }, // Update the fields in the request body
        { new: true } // Return the updated document
      );

      if (!updatedData) {
        return res.status(404).json({ msg: "Student not found" });
      }

      res.json({ msg: "Student updated successfully", updatedData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  },

  //student data get from the student_id
  getStudent: async (req, res) => {
    const { id } = req.params;
    console.log('id ', id)
    try {
      const stu = await studentTable.findById({ _id: id });
      // console.log('stu :', stu)
      if (!stu) return res.status(404).json({ msg: "No student" });

      console.log("Student data fetched");
      res.send(stu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = manageStudentCtrl;
