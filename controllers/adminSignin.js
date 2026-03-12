const bcrypt = require("bcryptjs");
const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const studentTable = require("../models/studentTable");
const lectureTable = require("../models/lectureTable");

async function adminSignInController(req, res) {
  try {
    let admin = false;
    let student = false;
    let lecturer = false;

    //Admin login
    const { email, password } = req.body;

    const checkPrefix = email.split(".");

    if (checkPrefix[1].includes("admin")) {
      admin = await AdminModel.findOne({ email });
      if (!admin) {
        throw new Error("User not found");
      }

      const checkPassword = await bcrypt.compare(password, admin.password);
      console.log("Cheack Password", checkPassword);

      if (checkPassword) {
        const tokenData = {
          _id: admin._id,
          email: admin.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: 60 * 60 * 100,
        });

        const tokenOption = {
          httpOnly: true,
          secure: false, // Set to true in production with HTTPS  
          sameSite: "lax", // Prevent CSRF
          maxAge: 60 * 60 * 100 * 1000, // 100 hours in milliseconds
        };

        res.cookie("token", token, tokenOption).status(200).json({
          message: "Login Successfully",
          data: token,
          details: admin,
          role: "admin",
          success: true,
          error: false,
        });
      } else {
        throw new Error("please check Password");
      }
      //student login
    } else if (checkPrefix[1].includes("stu")) {
      student = await studentTable.findOne({ email });
      // console.log("___student details :", student);
      if (!student) {
        throw new Error("Student not found");
      }

      const checkPassword = await bcrypt.compare(password, student.password);
      console.log("Cheack Password", checkPassword);

      if (checkPassword) {
        const tokenData = {
          _id: student._id,
          email: student.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: 60 * 60 * 100,
        });

        const tokenOption = {
          httpOnly: true,
          secure: true,
        };

        res.cookie("token", token, tokenOption).status(200).json({
          message: "Login Successfully",
          data: token,
          details: student,
          role: "student",
          success: true,
          error: false,
        });
      } else {
        throw new Error("please check Password");
      }

      //Lecturer loging
    } else if (checkPrefix[1].includes("lec")) {
      lecturer = await lectureTable.findOne({ email });
      console.log("___lecturer details", lecturer);

      if (!lecturer) {
        throw new Error("Lecturer not found");
      }

      const checkPassword = await bcrypt.compare(password, lecturer.password);
      console.log("Cheack Password", checkPassword);

      if (checkPassword) {
        const tokenData = {
          _id: lecturer._id,
          email: lecturer.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: 60 * 60 * 100,
        });

        const tokenOption = {
          httpOnly: true,
          secure: true,
        };

        res.cookie("token", token, tokenOption).status(200).json({
          message: "Login Successfully",
          data: token,
          details: lecturer,
          role: "lecturer",
          success: true,
          error: false,
        });
      } else {
        throw new Error("please check Password");
      }
    } else {
      console.log("___someone else");
    }

    if (!email) {
      throw new Error("Please provide email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }

    // const adminUser = await AdminModel.findOne({ email });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = adminSignInController;
// loging
