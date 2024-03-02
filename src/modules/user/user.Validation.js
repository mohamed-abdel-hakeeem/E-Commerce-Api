

import Joi from "joi"

const adduserVal = Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    repassword: Joi.valid(Joi.ref('password')).required(),
})


const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
  
})

const updateuserVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(100).trim(),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    repassword: Joi.valid(Joi.ref('password')),
    role:Joi.string().valid('user','admin')

})


export {
    adduserVal,
    paramsIdval,
    updateuserVal
}