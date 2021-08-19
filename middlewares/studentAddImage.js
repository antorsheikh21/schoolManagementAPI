const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Middleware", file)

        cb(null, path.join(`${__dirname}/../../uploads/students/`))


    },
    filename: function (req, file, cb) {
        const extention = path.extname(file.originalname)
        const fileName = file.originalname.replace(extention, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-")

        cb(null, +  Date.now() + "--" + fileName + extention)
    },
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 40,
    },

    fileFilter: function (req, file, cb) {
        console.log("Middleware", file)


        if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error("Only .jpg .png .jpeg format allowed ! Please Try again !"))
        }


    }
})

module.exports = upload;