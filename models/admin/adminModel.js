const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')

const avatarPath = path.join(`${__dirname}/../../avatar/avatar.png`)

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    localPhone: {
        type: String,
        required: true
    },
    personalPhone: {
        type: String,
        required: true
    },
    localEmail: {
        type: String,
        required: true
    },
    personalEmail: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Male"

    },
    joinDate: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: avatarPath
    }

}, { timestamps: true })

adminSchema.methods.generateJWT = function () {
    return token = jwt.sign({
        _id: this._id,
        name: this.name,
        localPhone: this.localPhone,
        personalPhone: this.personalPhone,
        localEmail: this.localEmail,
        personalEmail: this.personalEmail,
        gender: this.gender,
        joinDate: this.joinDate,


    }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = Admin = model("Admin", adminSchema);

