const StudentModel = require('../models/Students');
const { ROLES } = require('../utils/roles');

const getAllUsers = async (req, res) => {
    try {
        const users = await StudentModel.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const studentList = async (req, res) => {
    try {
        const students = await StudentModel.find( {role: "student"} );
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student list' });
    }
};

const instructorList = async (req, res) => {
    try {
        const instructors = await StudentModel.find( {role: "instructor"} );
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching instructor list' });
    }
};
const updateUserRole = async (req, res) => {
    try {
        const { userId, newRole } = req.body;
        
        if (!Object.values(ROLES).includes(newRole)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await StudentModel.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role' });
    }
};

const createCourse = async (req, res) => {
    res.json({ message: 'Course creation endpoint' });
};

const getMyCourses = async (req, res) => {
    res.json({ message: 'Get instructor courses endpoint' });
};

const enrollInCourse = async (req, res) => {
    res.json({ message: 'Course enrollment endpoint' });
};

const getEnrolledCourses = async (req, res) => {
    res.json({ message: 'Get enrolled courses endpoint' });
};

module.exports = {
    getAllUsers,
    updateUserRole,
    createCourse,
    getMyCourses,
    enrollInCourse,
    getEnrolledCourses,
    studentList,
    instructorList
};
