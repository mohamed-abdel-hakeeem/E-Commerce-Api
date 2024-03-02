import express from "express";
import { validation } from "../../midlleware/validation.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
import { addTocartVal, paramsIdval, updateQTYVal } from "./cart.Validation.js";
import { addToCart, clearUserCart, getloggedUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js";



export const cartRouter = express.Router();

cartRouter
  .route("/")
  .post( protectedroutes,allowedTo("user"),validation(addTocartVal),addToCart)
  .get(protectedroutes, allowedTo("user"), getloggedUserCart)
  .delete(protectedroutes,allowedTo("user"),clearUserCart);

cartRouter
  .route("/:id")
  .delete(protectedroutes,allowedTo("admin","user"),validation(paramsIdval),removeItemFromCart)
  .put(protectedroutes,allowedTo("admin","user"),validation(updateQTYVal),updateQuantity);
