const router = require('express').Router()
const {
    createStudent,
    getAllStudents,
    deleteStudentById,
    getStudentById,
    updateStudentById,
    addImageById,
    loginUserByPhone
} = require('../controllers/students/studentController')

const upload = require('../middlewares/studentAddImage')
router.route('/user')
    .get(getAllStudents)


router.route('/user/auth/login')
    .post(loginUserByPhone)

router.route('/user/auth/signup')
    .post(createStudent)


router.route('/user/:id')
    .delete(deleteStudentById)
    .get(getStudentById)
    .put(updateStudentById)

/**
 * @imagesUpload
 */

router.route('/user/image/')
    .post(upload.single("photo"), addImageById)




module.exports = router;