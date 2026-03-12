const calenderTable = require("../models/calenderTable");

const calenderCtrl = {
  createTestData: async (req, res) => {
    try {
      const {
        faculty,
        department,
        batch,
        modulename,
        lecturername,
        building,
        halls,
        lecture_date,
        start_time,
        end_time,
        year,
      } = req.body;

      const { convertTimeToMinutes } = require("../utils/timeNormalizer");
      let newStartMins = convertTimeToMinutes(start_time);
      let newEndMins = convertTimeToMinutes(end_time);

      // Auto-correct common "12:00 AM" typo to "12:00 PM" if it results in an invalid duration
      if (newEndMins <= newStartMins && end_time && end_time.match(/12:\d{2}\s?AM/i)) {
        newEndMins += 720; 
      }

      if (newEndMins <= newStartMins) {
        return res.status(400).json({ msg: "Invalid time range: End time must be after Start time.", error: true, success: false });
      }

      // Check for Clashes
      const existingLectures = await calenderTable.find({ lecture_date });
      
      let clashMessages = [];
      for (const lecture of existingLectures) {
        // Skip identical IDs if updating
        // (Assuming we might reuse this check)

        let existingStartMins = convertTimeToMinutes(lecture.start_time);
        let existingEndMins = convertTimeToMinutes(lecture.end_time);

        // Auto-fix existing DB records as well
        if (existingEndMins <= existingStartMins && lecture.end_time && lecture.end_time.match(/12:\d{2}\s?AM/i)) {
          existingEndMins += 720;
        }

        // Check time overlap: (StartA < EndB) and (EndA > StartB)
        const isTimeOverlap = (newStartMins < existingEndMins) && (newEndMins > existingStartMins);

        if (isTimeOverlap) {
          // EG_01: Exact same lecture double-booking
          if (lecture.halls === halls && lecture.lecturername === lecturername && lecture.modulename === modulename) {
            clashMessages.push(`Lecture already exists! This exact schedule is already in the system.`);
            break;
          }
          
          if (lecture.halls === halls) {
            // EG_02: Same Time Slot, Same Date, Same Hall, Different Lecturer
            if (newStartMins === existingStartMins && newEndMins === existingEndMins) {
              clashMessages.push(`The time slot, date and Hall ${halls} is already assigned by ${lecture.lecturername} for ${lecture.modulename} lecture.`);
            } else {
              // EG_03: Overlapping Time Slot, Same Hall
              clashMessages.push(`Can't Create the TimeTable: the time slot not available. Hall ${halls} has lecture ${lecture.start_time} to ${lecture.end_time}.`);
            }
            break;
          }
          // Same Lecturer logic
          if (lecture.lecturername === lecturername && lecturername) {
            clashMessages.push(`The Lecturer ${lecturername} is already assigned for ${lecture.modulename} at this time slot.`);
            break;
          }
        }
      }

      if (clashMessages.length > 0) {
        return res.status(409).json({ 
          msg: clashMessages.join(" | "), 
          error: true,
          success: false 
        });
      }

      const newData = new calenderTable({
        faculty,
        department,
        batch,
        modulename,
        lecturername,
        building,
        halls,
        lecture_date,
        start_time,
        end_time,
        year,
      });
      await newData.save();

      res.json({ msg: "Created", success: true });
    } catch (error) {
      console.log("CRITICAL ERROR:", error.stack || error);
      res.status(500).json({ msg: "Server Error", error: true });
    }
  },

  getCalender: async (req, res) => {
    try {
      let calenderTables = await calenderTable.find();
      res.send(calenderTables);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  getSingleCalenderData: async (req, res) => {
    const { id } = req.params;
    // console.log("wdwdwdww", req.p)
    try {
      // let calenderTables = await calenderTable.findByIdAndUpdate;
      let calenderTables = await calenderTable.findById(id);
      res.send(calenderTables);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  createUpdateData: async (req, res) => {
    const { id } = req.params;
    const {
      faculty,
      department,
      batch,
      modulename,
      lecturername,
      building,
      halls,
      lecture_date,
      start_time,
      end_time,
      year,
    } = req.body;
      console.log(id, faculty);
    try {
      const { convertTimeToMinutes } = require("../utils/timeNormalizer");
      let newStartMins = convertTimeToMinutes(start_time);
      let newEndMins = convertTimeToMinutes(end_time);

      if (newEndMins <= newStartMins && end_time && end_time.match(/12:\d{2}\s?AM/i)) {
        newEndMins += 720; 
      }

      if (newEndMins <= newStartMins) {
        return res.status(400).json({ msg: "Invalid time range: End time must be after Start time.", error: true, success: false });
      }

      // Check for Clashes
      const existingLectures = await calenderTable.find({ lecture_date });
      
      let clashMessages = [];
      for (const lecture of existingLectures) {
        // Skip comparing against itself
        if (lecture._id.toString() === id) continue;

        let existingStartMins = convertTimeToMinutes(lecture.start_time);
        let existingEndMins = convertTimeToMinutes(lecture.end_time);

        if (existingEndMins <= existingStartMins && lecture.end_time && lecture.end_time.match(/12:\d{2}\s?AM/i)) {
          existingEndMins += 720;
        }

        const isTimeOverlap = (newStartMins < existingEndMins) && (newEndMins > existingStartMins);

        if (isTimeOverlap) {
          if (lecture.halls === halls && lecture.lecturername === lecturername && lecture.modulename === modulename) {
            clashMessages.push(`Lecture already exists! This exact schedule is already in the system.`);
            break;
          }
          
          if (lecture.halls === halls) {
            if (newStartMins === existingStartMins && newEndMins === existingEndMins) {
              clashMessages.push(`The time slot, date and Hall ${halls} is already assigned by ${lecture.lecturername} for ${lecture.modulename} lecture.`);
            } else {
              clashMessages.push(`Can't Create the TimeTable: the time slot not available. Hall ${halls} has lecture ${lecture.start_time} to ${lecture.end_time}.`);
            }
            break;
          }
          if (lecture.lecturername === lecturername && lecturername) {
            clashMessages.push(`The Lecturer ${lecturername} is already assigned for ${lecture.modulename} at this time slot.`);
            break;
          }
        }
      }

      if (clashMessages.length > 0) {
        return res.status(409).json({ 
          msg: clashMessages.join(" | "), 
          error: true,
          success: false 
        });
      }

      const updatedData = await calenderTable.findOneAndUpdate(
        { _id: id },
        {
          faculty,
          department,
          batch,
          modulename,
          lecturername,
          building,
          halls,
          lecture_date,
          start_time,
          end_time,
          year,
        },
        { new: true } // Return updated doc
      );
      if (!updatedData) {
        return res.status(404).json({ msg: "Data not found" });
      }
      res.json({ msg: "Updated calendar data", updatedData, success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message, success: false });
    }
  },
};

module.exports = calenderCtrl;
