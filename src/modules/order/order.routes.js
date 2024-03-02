import express from "express";
import { validation } from "../../midlleware/validation.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
import { paramsIdval} from "./cart.Validation.js";
import { createOrder, getSpecificOrder } from "./order.controller.js";
import { createorderVal } from "./order.Validation.js";


export const orderRouter = express.Router();

orderRouter
.route("/")
  .get(protectedroutes, allowedTo("user"),getSpecificOrder)
orderRouter.get("all",protectedroutes,allowedTo("admin"),getSpecificOrder)
orderRouter
  .route("/:id")
 .post(protectedroutes,allowedTo("user"),validation(createorderVal),createOrder)