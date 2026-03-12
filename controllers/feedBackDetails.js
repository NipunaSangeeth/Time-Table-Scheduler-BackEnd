const feedBackTable = require("../models/feedBack");

const router = require("../routes");

const feedBackCtrl = {
  //post feedback data
  createFeedbackData: async (req, res) => {
    try {
      const {
        faculty,
        department,
        module,
        batch,
        feedback,
        studentid,
        lecturername,
        modulecode,
        modulename,
      } = req.body;
      const newFeedbackData = new feedBackTable({
        faculty,
        department,
        module,
        batch,
        feedback,
        studentid,
        lecturername,
        modulecode,
        modulename,
      });
      console.log('newFeedbackData', newFeedbackData)
      await newFeedbackData.save();

      res.json({ msg: "Created" });
    } catch (error) {
      console.log("error", error);
    }
  },

  //get feedback data
  getFeedback: async (req, res) => {
    try {
      let feedbackTables = await feedBackTable.find();
      console.log("All Feedback data Fetched");
      res.send(feedbackTables);
      console.log("____feedback", feedbackTables);
      
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

module.exports = feedBackCtrl;
