const router = require('express').Router()

const { signupTeacher, loginTeacher, getAllTeacher, getTeacherById } = require('../controllers/teachers/teacherController')

router.route('/teacher/signup')
    .post(signupTeacher)
router.route('/teacher/signin')
    .post(loginTeacher)

router.route('/teacher')
    .get(getAllTeacher)
router.route('/teacher/:id')
    .get(getTeacherById)


module.exports = router;