import express from "express";
import { validation } from "../../midlleware/validation.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
import { addWishlistVal, paramsIdval } from "./wishList.Validation.js";
import { addTowishlist, getloggeduserwishlist, removeFromwishlist } from "./wishList.controller.js";


export const wishListRouter = express.Router();

wishListRouter
  .route("/")
  .patch( protectedroutes,allowedTo("user"),validation(addWishlistVal),addTowishlist)
  .get(protectedroutes,allowedTo("user"),getloggeduserwishlist);

wishListRouter
  .route("/:id")
  .delete(protectedroutes,allowedTo("admin","user"),validation(paramsIdval),removeFromwishlist);
