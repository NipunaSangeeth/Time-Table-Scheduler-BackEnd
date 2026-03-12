const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilepic: String,
    // role: String,
  },
  {
    timestamps: true,
  }
);

const AdminModel = mongoose.model("AdminTable", adminSchema);

module.exports = AdminModel;
