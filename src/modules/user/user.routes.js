import express from "express";
import { validation } from "../../midlleware/validation.js";
import { adduserVal, paramsIdval, updateuserVal } from "./user.Validation.js";
import { adduser, deleteUser, getallusers, getsingleuser, updateuser } from "./user.controller.js";

export const userrouter = express.Router({ mergeParams: true });

userrouter
  .route("/")
  .post( validation(adduserVal), adduser)
  .get(getallusers)

userrouter
  .route("/:id")
  .get(validation(paramsIdval), getsingleuser)
  .put( validation(updateuserVal), updateuser)
  .delete(validation(paramsIdval),deleteUser);
