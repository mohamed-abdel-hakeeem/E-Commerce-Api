import Joi from "joi";

const createorderVal = Joi.object({
  id: Joi.string().required().hex().length(24).required(),
  shipingAddress: Joi.object({
    street: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
  }).required()
});

const paramsIdval = Joi.object({
  id: Joi.string().required().hex().length(24).required(),
});

const updateQTYVal = Joi.object({
  id: Joi.string().required().hex().length(24).required(),
  quantity: Joi.number().integer().options({ convert: false }).required(),
});

export { createorderVal, updateQTYVal, paramsIdval };
