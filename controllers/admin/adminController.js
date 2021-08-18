const { signUpValidator } = require('../../validation/adminValidation')
const Admin = require('../../models/admin/adminModel')
const bcrypt = require('bcrypt')




module.exports.signUp = async function (req, res) {
    const {
        name,
        localPhone,
        personalPhone,
        localEmail,
        personalEmail,
        gender,
        joinDate,
        secret
    } = req.body;

    const valid = signUpValidator({
        name,
        localPhone,
        personalPhone,
        localEmail,
        personalEmail,
        joinDate,
        secret
    })

    if (valid.error) {
        res.status(200).send({ message: valid.error.details[0].message })
    } else {
        const alreadyAdmin = await Admin.find()
        if (alreadyAdmin.length === 0) {
            try {
                const salt = await bcrypt.genSalt(10)
                if (salt) {
                    const hashedPassword = await bcrypt.hash(secret, salt)
                    const createAdmin = new Admin({
                        name,
                        localPhone,
                        personalPhone,
                        localEmail,
                        personalEmail,
                        gender,
                        joinDate, secret: hashedPassword
                    })
                    const admin = await createAdmin.save();

                    if (admin) {
                        const token = createAdmin.generateJWT()
                        res.status(200).send({ message: "Account Created successfull", token: token })
                    } else {
                        res.status(500).send({ message: "Something went wrong" })
                    }

                }

            } catch (err) {
                res.status(500).send({ message: err.message })
            }
        } else {
            res.status(200).send({ message: "Admin is Already Exist !" })
        }
    }

}
module.exports.signIn = async function (req, res) {
    const { personalPhone, secret } = req.body;
    try {
        const match = await Admin.findOne({ personalPhone })
        console.log(match)
        if (match) {
            const hashed = match.secret;
            const token = match.generateJWT()
            const isValid = await bcrypt.compare(secret, hashed)
            if (isValid) {
                res.status(200).send({ message: "Login Successfull", token: token })
            } else {
                res.status(400).send({ message: "Phone or secret is invalid !" })
            }

        } else {
            res.status(404).send({ message: "Not Found" })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

module.exports.getAdmin = async function (req, res) {
    const { id } = req.params;
    try {
        const admin = await Admin.findById({ _id: id })
        if (admin) {
            res.status(200).send(admin)
        } else {
            res.status(404).send({ message: "Admin Not Exist in This ID" })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

module.exports.addAdminProfile = function (req, res) {

}
module.exports.editAdminProfile = async function (req, res) {
    try {

    } catch (err) {

    }
}
