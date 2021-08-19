const router = require('express').Router()
const { filterStudent } = require('../controllers/students/filterStudent')

router.route('/student/filter')
    .get(filterStudent)

module.exports = router;