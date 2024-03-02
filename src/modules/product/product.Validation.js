

import Joi from "joi"

const addproductVal = Joi.object({
    title: Joi.string().min(2).max(100).required().trim(),
    description: Joi.string().min(2).max(1000).required().trim(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0).optional(),
    quantity: Joi.number().min(0).optional(),
    category: Joi.string().hex().length(24).required(),
    subcategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdby: Joi.string().hex().length(24).optional(),

    
})


const paramsIdval = Joi.object({
    id: Joi.string().hex().length(24).required(),

})

const updateProductVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(2).max(100).required().trim(),
    description: Joi.string().min(2).max(1000).required().trim(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0).required().optional(),
    quantity: Joi.number().min(0).optional(),
    category: Joi.string().hex().length(24).required(),
    subcategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdby: Joi.string().hex().length(24).optional(),



})


export {
    addproductVal,
    paramsIdval,
    updateProductVal
}