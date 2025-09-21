const express = require("express");
const router = express.Router();
const CourseModel = require("../models/Course");
const upload = require("../middlewares/upload.middleware");
const { createCourse, getCourses } = require("../controllers/course.controller");

router.post("/courses", upload.single("image"), createCourse);
router.get("/allCourses", getCourses);
module.exports = router;
