const { IncomingForm } = require('formidable');
const Student = require('../../models/students/studentsModel');
const bcrypt = require('bcrypt');

module.exports.createStudent = async function (req, res) {
    const { phoneNumber, password, fullName, class: studentClass, fathersName, mothersName, gender, roll, branch, } = req.body;
    try {
        const isStudent = await Student.findOne({ phoneNumber })
        if (isStudent) {
            res.status(200).json({ message: "Student Already Registered !" })
        } else {
            // const salt = await bcrypt.genSalt(10)
            // const hashedPassword = await bcrypt.hash(password, salt)
            // console.log("PASSWORD:", hashedPassword)

            // if (hashedPassword) {
            const student = new Student({ fullName, phoneNumber, password, class: studentClass, branch, fathersName, mothersName, gender, roll, })

            const saveStudent = await student.save();
            if (saveStudent) {
                res.status(200).json({ message: "Student Saved successfully", payload: saveStudent })
            } else {
                res.status(500).json({ message: "Something went wrong !" })
            }
            // }
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
        // console.log(err)

    }
}

module.exports.getAllStudents = async function (req, res) {
    try {
        const students = await Student.find().select({ password: false })
        if (students) {
            res.status(200).json(students)
        } else {
            res.status(500).json({ message: "Something went wrong !" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports.deleteStudentById = async function (req, res) {
    const { id } = req.params;
    try {
        const deletedStudent = await Student.findByIdAndDelete({ _id: id })
        if (deletedStudent) {
            res.status(200).json({ message: "Student deleted", payload: deletedStudent.fullName })
        } else {
            res.status(500).json({ message: "User Not Find in This id !" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.getStudentById = async function (req, res) {
    const { id } = req.params;
    try {
        const student = await Student.findById({ _id: id })
        if (student) {
            res.status(200).json(student)
        } else {
            res.status(500).json({ message: "User Not Find in This id !" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports.updateStudentById = async function (req, res) {
    const { id } = req.params
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { ...req.body }, { new: true })
        console.log(updatedStudent)
        if (updatedStudent) {
            res.status(200).json({ message: "Update successfully", payload: updatedStudent })
        } else {
            res.status(200).json({ message: "User Not found !" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err)
    }


}

module.exports.addImageById = async function (req, res) {
    const { id } = req.params
    console.log(id)
}