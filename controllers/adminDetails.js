const AdminModel = require("../models/adminModel");

async function adminDetailsController(req, res) {
  try {
    console.log("AdminId", req.adminId);

    const admin = await AdminModel.findById(req.adminId);
    res.status(200).json({
      data: admin,
      error: false,
      success: true,
      message: "admin details",
    });

    console.log("Admin",admin)

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = adminDetailsController;
