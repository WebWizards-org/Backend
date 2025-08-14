const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Students')
const { hashPassword, comparePassword } = require('./utils/passwordUtils')
const authRoutes = require('./routes/auth.routes') 
const dotenv = require("dotenv");
const connectDb = require('./utils/db')
dotenv.config()



const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}))

// mongoose.connect("mongodb://127.0.0.1:27017/Students")

app.use('/api/auth',authRoutes)

connectDb().then(()=>{
app.listen(3001, ()=>{
    console.log("Server is running");
})
})
