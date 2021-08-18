const Joi = require('joi')

module.exports.signUpValidator = function (data) {
    const adminSchema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        localPhone: Joi.string().required().min(11),
        personalPhone: Joi.string().required().min(11),
        localEmail: Joi.string().required().email(),
        personalEmail: Joi.string().required().email(),
        joinDate: Joi.string().required(),
        secret: Joi.string().required().min(6).max(20),
    })

    return adminSchema.validate(data)
}




/**
 * @pattern err.error.details[0].message
 */