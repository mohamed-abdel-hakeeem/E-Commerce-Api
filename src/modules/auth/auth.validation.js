
import Joi from "joi";

const signupval = Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    repassword: Joi.valid(Joi.ref('password')).required(),
})


const signinval = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),

})

const changepasswordval = Joi.object({
    id: Joi.string().hex().length(24).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    newpassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
})

export {
    signupval,
    signinval,
    changepasswordval
}