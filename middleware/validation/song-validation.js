const Joi = require('joi')
const ClientError = require('../../errors/ClientError')

const schema = Joi.object({
    nama: Joi.string()
    .min(3)
    .required(),
    email: Joi.string()
    .required(),
    albumId: Joi.string().uuid()
    .required(),
})

const validate = (req, res, next) => {
    try {
        const { error } = schema.validate(req.body)

    if (error) {
        throw new ClientError(error.message)
    }
    next()
    } catch (error) {
        next(error)
    }
}

module.exports = validate