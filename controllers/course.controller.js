const Course = require("../models/Course");

const createCourse = async (req, res) => {
  try {
    const { title, description, price, rating, studentsEnrolled } = req.body;

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newCourse = await Course.create({
      title,
      description,
      image: req.file.filename,
      price: price || 0,
      rating: rating || 0,
      studentsEnrolled: studentsEnrolled || 0,
    });

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

module.exports = { createCourse, getCourses };
