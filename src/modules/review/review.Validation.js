

import Joi from "joi"

const addReviewVal = Joi.object({
    text: Joi.string().min(2).max(100).required().trim(),
    rate: Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required()
})


const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
  
})

const updateReviewVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    Text: Joi.string().min(2).max(100).trim(),
    rate: Joi.number().min(0).max(5),
    product:Joi.string().hex().length(24) 
})




export {
    addReviewVal,
    paramsIdval,
    updateReviewVal
}