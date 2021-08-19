
const Teacher = require('../../models/teachers/teacherModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isEmail = require('../../utils/mailChechker')


module.exports.signupTeacher = async function (req, res) {
    const { name, phone, email, gender, subject, class: Class, joinDate, teacher, password } = req.body;
    let defaultPassword;
    let manualPassword;
    if (!password) {
        defaultPassword = "1234";
    } else {
        manualPassword = password;
    }

    // const isTeacher = await Teacher.findOne({ $or: [{ email},{phone }] });

    const isTeacher = await Teacher.findOne({ email })
    if (!isTeacher) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(defaultPassword ? defaultPassword : manualPassword, salt)

            const createTeacher = new Teacher({ name, phone, email, gender, subject, class: Class, joinDate, teacher, password: hashedPassword })
            const savedTeacher = await createTeacher.save();
            if (savedTeacher) {
                res.status(200).json(savedTeacher)
            } else {
                res.status(500).json({ "message": "Something went wrong !" })
            }
        } catch (err) {
            res.status(500).json({ "message": err.message })
        }
    } else {
        res.status(200).json({ message: "Teacher Already Registered !" })
    }
}




module.exports.loginTeacher = async function (req, res) {
    try {
        const { phoneOrEmail, password } = req.body
        const isEmailTrue = isEmail(phoneOrEmail)
        if (isEmailTrue) {
            const isTeacher = await Teacher.findOne({ email: phoneOrEmail });
            if (isTeacher) {
                const isValid = await bcrypt.compare(password, isTeacher.password);
                if (isValid) {
                    const token = await jwt.sign({ _id: isValid._id, name: isValid.name }, process.env.JWT_SECRET)
                    res.status(200).json({
                        message: "Login Successfull",
                        token: token
                    })
                } else {
                    res.status(200).json({ message: "email or password mismatch" })
                }
            }
        } else if (phoneOrEmail.length === 11) {
            const isTeacher = await Teacher.findOne({ phone: phoneOrEmail });
            if (isTeacher) {
                const isValid = await bcrypt.compare(password, isTeacher.password);
                if (isValid) {
                    const token = await jwt.sign({ _id: isValid._id, name: isValid.name }, process.env.JWT_SECRET)
                    res.status(200).json({
                        message: "Login Successfull",
                        token: token
                    })
                } else {
                    res.status(200).json({ message: "email or password mismatch" })
                }
            }


        } else {
            res.status(200).json({ message: 'Something Went Wrong !' })
        }


    } catch (err) {
        res.status(500).json({ "message": err.message })
    }

}
module.exports.getAllTeacher = async function (req, res) {
    try {
        const teachers = await Teacher.find().select({ password: 0 })
        if (teachers) {
            res.status(200).json(teachers)
        } else {
            res.status(500).json({ "message": "Something Went Wrong" })
        }
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}
module.exports.getTeacherById = async function (req, res) {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findById({ _id: id })
        if (teacher) {
            res.status(200).json(teacher)
        } else {
            res.status(404).json({ "message": "Teacher is Not Found" })
        }
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}