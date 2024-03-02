import express from "express";
import {
  addcategory,
  deletecategory,
  getallcategories,
  getsinglecategory,
  updatecategory,
} from "./category.controller.js";
import { validation } from "../../midlleware/validation.js";
import {
  addCategoryVal,
  paramsIdval,
  updateCategoryVal,
} from "./category.Validation.js";
import { uploadSingleFile } from "../../services/fileuploads/fileupload.js";
import { subCategoryrouter } from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";
export const categoryrouter = express.Router();

categoryrouter.use("/:category/subcategries/", subCategoryrouter);

categoryrouter
  .route("/")
  .post(protectedroutes, allowedTo("admin"),uploadSingleFile("img"), validation(addCategoryVal), addcategory)
  .get(getallcategories);

categoryrouter
  .route("/:id")
  .get(validation(paramsIdval), getsinglecategory)
  .put(protectedroutes,uploadSingleFile("img"), validation(updateCategoryVal), updatecategory)
  .delete(protectedroutes,deletecategory);
