const { verifyToken } = require('../utils/jwtUtils');
const StudentModel = require('../models/Students');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await StudentModel.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = authMiddleware;
