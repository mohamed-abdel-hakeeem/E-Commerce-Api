

import Joi from "joi"

const addCategoryVal = Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required().max(10000000)
    }).required()

})


const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
    Image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required().max(10000000)
    }).required()

})

const updateCategoryVal = Joi.object({
    name: Joi.string().min(2).max(100).trim(),
    id: Joi.string().hex().length(24),
    Image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required().max(10000000)
    })


})


export {
    addCategoryVal,
    paramsIdval,
    updateCategoryVal
}