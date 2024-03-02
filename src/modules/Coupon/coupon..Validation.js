import Joi from "joi";

const addCouponVal = Joi.object({
  code: Joi.string().min(2).max(100).required().trim(),
  discount: Joi.number().min(0).required(),
  expires: Joi.date().required(),
});

const paramsIdval = Joi.object({
  id: Joi.string().required().hex().length(24).required(),
});

const updateCouponVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    code: Joi.string().min(2).max(100).trim(),
    discount: Joi.number().min(0),
    expires: Joi.date(),
})

export { addCouponVal, paramsIdval, updateCouponVal };
