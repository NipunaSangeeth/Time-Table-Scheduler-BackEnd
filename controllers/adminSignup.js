const bcrypt = require("bcryptjs");
const AdminModel = require("../models/adminModel");

async function adminSignupController(req, res) {
  try {
    const { email, password, name, profilepic } = req.body;

    const adminUser = await AdminModel.findOne({ email });

    console.log("Admin ", adminUser);

    if (adminUser) {
      throw new Error("Already user exits.");
    }

    if (!email) {
      throw new Error("Please Provide Email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }

    if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "Admin",
      password: hashPassword,
    };

    const adminData = new AdminModel(payload);
    const saveAdmin = await adminData.save();

    res.status(201).json({
      data: saveAdmin,
      success: true,
      error: false,
      message: "User created Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = adminSignupController;

// registration
