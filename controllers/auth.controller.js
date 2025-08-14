const StudentModel = require('../models/Students')
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await StudentModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: "No record found" });
        }
        
        const isMatch = await comparePassword(password, user.password);
        
        if (isMatch) {
            res.json("Success");
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
}

const register = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;
        const existingUser = await StudentModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const newStudent = await StudentModel.create({
            name,
            email,
            number,
            password: hashedPassword
        });

        res.status(201).json({ 
            message: 'Registration successful',
            student: {
                id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
                number: newStudent.number
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

module.exports = {login, register}