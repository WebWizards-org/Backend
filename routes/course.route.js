const express = require("express");
const router = express.Router();
const CourseModel = require("../models/Course");
const upload = require("../middlewares/upload.middleware");
const {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  getCourseById,
} = require("../controllers/course.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/courses", upload.single("image"), createCourse);
router.get("/allCourses", getCourses);
router.delete("/courses/:id", deleteCourse);
router.put("/courses/:id", upload.single("image"), updateCourse);
router.get("/courses/:id", getCourseById);

module.exports = router;
