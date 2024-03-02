

import Joi from "joi"

const addaddressVal = Joi.object({
    street: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
})


const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
  
})

const updateaddressVal = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    phone: Joi.string().trim(),
})




export {
    addaddressVal,
    updateaddressVal,
    paramsIdval
}