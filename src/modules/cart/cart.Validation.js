
import Joi from "joi"



const addTocartVal = Joi.object({
    product: Joi.string().required().hex().length(24).required(),
    quantity: Joi.number().integer().options({convert:false})


})


const paramsIdval = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
  
})

const updateQTYVal = Joi.object({
    id: Joi.string().required().hex().length(24).required(),
    quantity: Joi.number().integer().options({convert:false}).required()


})




export {
    addTocartVal,
    updateQTYVal,
    paramsIdval
}