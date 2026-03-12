const express = require("express");
const calenderCtrl = require("../controllers/getCalender");
const feedBackCtrl = require("../controllers/feedBackDetails");
const manageLectureCtrl = require("../controllers/manageLecturers");
const manageStudentCtrl = require("../controllers/manageStudents");
const manageModuleCtrl = require("../controllers/manageModules");
const managelecturehallCtrl = require("../controllers/managelectureHalls");

const router = express.Router();

//admin create
const adminSignupController = require("../controllers/adminSignup");
const adminSignInController = require("../controllers/adminSignin");
const authToken = require("../middleware/authToken");
const adminDetailsController = require("../controllers/adminDetails");
const adminLogout = require("../controllers/adminLogout");

router.post("/signup", adminSignupController);
router.post("/signin", adminSignInController);
//get admin details
router.get("/admin-details", authToken, adminDetailsController);
//log out admin
router.get("/adminLogout", adminLogout);

//calender
router.post("/generate-calendar", calenderCtrl.createTestData);
router.get("/createtable", calenderCtrl.getCalender);
router.get("/createtable/:id", calenderCtrl.getSingleCalenderData);
router.put("/update-calendar/:id", calenderCtrl.createUpdateData);

// new api call feedback table
router.post("/feedback-table", feedBackCtrl.createFeedbackData);
router.get("/get-feedbacktable", feedBackCtrl.getFeedback);

//new api call Manage Lecture
router.post("/manage-lecture", manageLectureCtrl.createLecturerData);
router.get("/get-managelecture", manageLectureCtrl.getLecture);
router.put("/update-lecture/:id", manageLectureCtrl.updateLectureData);
router.get("/get-managelecturer/:id", manageLectureCtrl.getIdLecturer);

//new api call Manage Student
router.post("/manage-student", manageStudentCtrl.createStudentData);
router.put("/update-student/:id", manageStudentCtrl.updateStudentData);
router.get("/get-managestudent/:id", manageStudentCtrl.getStudent);

//new api call Manage Module
router.post("/manage-module", manageModuleCtrl.createModuleData);
router.get("/get-managemodule", manageModuleCtrl.getModules);

//new api call Manage Lecture Halls
router.post("/manage-lecturehall", managelecturehallCtrl.createhallData);
router.get("/get-managelecturehalls", managelecturehallCtrl.getLectureHalls);

module.exports = router;
