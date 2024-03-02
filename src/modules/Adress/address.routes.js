import express from "express";
import { validation } from "../../midlleware/validation.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
import {  addaddressVal, paramsIdval } from "./address.Validation.js";
import { addAddress, getloggeduserAddress, removeAddress } from "./addres.controller.js";



export const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch( protectedroutes,allowedTo("user"),validation(addaddressVal),addAddress)
  .get(protectedroutes,allowedTo("user"),getloggeduserAddress);

addressRouter
  .route("/:id")
  .delete(protectedroutes,allowedTo("admin","user"),validation(paramsIdval),removeAddress);
