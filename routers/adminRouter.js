const router = require('express').Router();

const { signUp, getAdmin, signIn, addAdminProfile } = require('../controllers/admin/adminController')


router.route('/signup')
    .post(signUp)
router.route('/signin')
    .post(signIn)
router.route('/add-profile')
    .post(addAdminProfile)
router.route('/profile/:id')
    .get(getAdmin)
module.exports = router;