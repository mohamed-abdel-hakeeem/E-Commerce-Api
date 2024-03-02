import express from "express";
import { validation } from "../../midlleware/validation.js";
import {  changepasswordval, signinval, signupval } from "./auth.validation.js";
import {  changepassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../midlleware/checkEmail.js";
export const authrouter = express.Router()
authrouter.post(('/signup'),validation(signupval),checkEmail ,signup)
 authrouter.post(('/signin'),validation(signinval) ,signin)
 authrouter.put(('/change-password/:id'),validation(changepasswordval) ,changepassword)

