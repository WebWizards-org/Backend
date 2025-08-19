const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type:String, required:true, unique:true },
  password: { type:String, required:true },
  role: { 
    type: String, 
    enum: ['admin','Instructor','student'], 
    default: 'student' 
  }
}, { timestamps: true });


const StudentModel = mongoose.model("Students", StudentSchema)
module.exports = StudentModel