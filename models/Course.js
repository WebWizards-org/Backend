mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    rating: { type: Number, default: 0 },
    studentsEnrolled: { type: Number, default: 0 },
})

const CourseModel = mongoose.model("Courses", courseSchema);
module.exports = CourseModel;