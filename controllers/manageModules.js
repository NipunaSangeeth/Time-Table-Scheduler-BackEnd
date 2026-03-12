const moduleTable = require("../models/moduleTable");

const router = require("../routes");

const manageModuleCtrl = {
  //Module Data Post
  createModuleData: async (req, res) => {
    try {
      const {
        faculty,
        department,
        batch,
        modulename,
        modulecode,
        lecturername,
        lecturerid,
      } = req.body;
      const newModuleData = new moduleTable({
        faculty,
        department,
        batch,
        modulename,
        modulecode,
        lecturername,
        lecturerid,
      });
      await newModuleData.save();

      res.json({ msg: "Created" });
    } catch (error) {
      console.log("error", error);
    }
  },

  //Get Module Data
  getModules: async (req, res) => {
    try {
      let moduletables = await moduleTable.find();
      console.log("All ModuleData Fetched");
      res.send(moduletables);
      console.log("Module Dataaaa", moduletables);

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

module.exports = manageModuleCtrl;
