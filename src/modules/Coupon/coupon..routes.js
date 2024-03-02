import express from "express";
import { validation } from "../../midlleware/validation.js";
import {
  addCouponVal,
  paramsIdval,
  updateCouponVal} from "./coupon..Validation.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
import {
  addCoupon,
  deleteCoupon,
  getallCoupons,
  getsingleCoupon,
  updateCoupon,
} from "./coupon.controller.js";

export const couponRouter = express.Router();
couponRouter.use(protectedroutes, allowedTo("admin"));
couponRouter
  .route("/")
  .post(validation(addCouponVal), addCoupon)
  .get(getallCoupons);

couponRouter
  .route("/:id")
  .get(validation(paramsIdval), getsingleCoupon)
  .put(validation(updateCouponVal), updateCoupon)
  .delete(validation(paramsIdval), deleteCoupon);
