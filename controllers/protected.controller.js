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
    getEnrolledCourses
};
