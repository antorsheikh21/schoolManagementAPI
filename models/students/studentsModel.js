const { Schema, model } = require('mongoose');
const path = require('path')

const avatarPath = path.join(`${__dirname}/../../avatar/avatar.png`)


const studentSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    class: {
        type: String,
        required: true,

    },
    branch: {
        type: String,
        enum: ['A', 'B', 'C', 'Science', 'Arts', 'Com'],
        required: true,
    },
    fathersName: {
        type: String,
        required: true
    },
    mothersName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    avatar: {
        type: String,
        default: avatarPath
    },
    roll: {
        type: String,
        required: true
    },
    password: {
        type: String,
    }
})

module.exports = Student = model("Student", studentSchema)