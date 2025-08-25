const express = require('express');
const router = express.Router();
const { checkRole } = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const { ROLES } = require('../utils/roles');
const {
    getAllUsers,
    updateUserRole,
    createCourse,
    getMyCourses,
    enrollInCourse,
    getEnrolledCourses
} = require('../controllers/protected.controller');

router.get('/users', authMiddleware, checkRole(ROLES.ADMIN), getAllUsers);
router.put('/users/role', authMiddleware, checkRole(ROLES.ADMIN), updateUserRole);

router.post('/courses', authMiddleware, checkRole(ROLES.INSTRUCTOR), createCourse);
router.get('/instructor/courses', authMiddleware, checkRole(ROLES.INSTRUCTOR), getMyCourses);

router.post('/courses/:courseId/enroll', authMiddleware, checkRole(ROLES.STUDENT), enrollInCourse);
router.get('/student/courses', authMiddleware, checkRole(ROLES.STUDENT), getEnrolledCourses);

module.exports = router;
