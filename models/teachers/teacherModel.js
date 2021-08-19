const { Schema, model } = require('mongoose')

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    teacher: {
        type: String,
        enum: ['ClassTeacher', 'Normal'],
        default: 'Normal'
    },
    subject: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        enum: ["six", "seven", "eight", "nine", "ten"]
    },
    joinDate: {
        type: String,
        required: true
    },
    password: {
        type: String,
    }
})


module.exports = Teacher = model("Teacher", teacherSchema);