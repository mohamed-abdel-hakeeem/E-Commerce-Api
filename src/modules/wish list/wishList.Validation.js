

import Joi from "joi"

const addWishlistVal = Joi.object({

    product:Joi.string().hex().length(24).required()
})


const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
  
})

const updateWishlistVal = Joi.object({
  
    product:Joi.string().hex().length(24) 
})




export {
    addWishlistVal,
    paramsIdval,
    updateWishlistVal
}