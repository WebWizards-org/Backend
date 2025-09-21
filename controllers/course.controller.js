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

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
};

// Update course by ID
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      studentsEnrolled: req.body.studentsEnrolled,
    };
    if (req.file && req.file.filename) {
      updateData.image = req.file.filename;
    }
    const updated = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }
    res
      .status(200)
      .json({ message: "Course updated successfully", course: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  getCourseById,
};
