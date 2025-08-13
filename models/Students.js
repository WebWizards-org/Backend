const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    password: String
})

const StudentModel = mongoose.model("Students", StudentSchema)
module.exports = StudentModel