const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Students')
const { hashPassword } = require('./utils/passwordUtils')

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Students")

app.post('/register', async (req, res) => {
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
})

app.listen(3001, ()=>{
    console.log("Server is running");
})