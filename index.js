const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Students')
const { hashPassword, comparePassword } = require('./utils/passwordUtils')
const authRoutes = require('./routes/auth.routes') 
const message  = require('./routes/contactUs.routes')
const dotenv = require("dotenv");
const connectDb = require('./utils/db')
dotenv.config()



const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// mongoose.connect("mongodb://127.0.0.1:27017/Students")

app.use('/api/auth', authRoutes);
const protectedRoutes = require('./routes/protected.routes');
app.use('/api/protected', protectedRoutes);
app.use('/api/messages', message);

connectDb().then(()=>{
app.listen(3001, ()=>{
    console.log("Server is running");
})
})
