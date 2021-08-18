const router = require('express').Router()
const {
    createStudent,
    getAllStudents,
    deleteStudentById,
    getStudentById,
    updateStudentById,
    addImageById
} = require('../controllers/students/studentController')

const upload = require('../middlewares/studentAddImage')
router.route('/user')
    .post(createStudent)
    .get(getAllStudents)


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