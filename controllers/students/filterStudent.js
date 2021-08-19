const Student = require('../../models/students/studentsModel')

module.exports.filterStudent = async function (req, res) {
    const { class: Class, to, branch } = req.query;
    // let filterObj={}
    // const filterClass= Class===true && to===true?filterObj.class=


    try {

        if (Class && to) {
            console.log(Class, to)
            const students = await Student.find({ class: { $gte: Class - to } })
            if (students) {
                res.status(200).json(students)
            } else {
                res.status(404).json({ message: "Students Not Found !" })
            }

        } else if (Class && to === undefined) {
            console.log("Else If", Class)
            const students = await Student.find({ class: Class })
            if (students.length > 1) {
                res.status(200).json(students)
            } else {
                res.status(404).json({ message: "Students Not Found !" })
            }
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

