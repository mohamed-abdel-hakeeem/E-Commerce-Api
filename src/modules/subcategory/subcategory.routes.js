import express from "express";
import { validation } from "../../midlleware/validation.js";
import { uploadSingleFile } from "../../services/fileuploads/fileupload.js";
import { addsubCategoryVal, paramsIdval, updatesubCategoryVal } from "./subcategory.Validation.js";
import { addsubcategory, deletesubcategory, getallsubcategories, getsinglesubcategory, updatesubcategory } from "./subcategory.controller.js";
export const subCategoryrouter = express.Router({mergeParams: true});

subCategoryrouter
  .route("/")
  .post( validation(addsubCategoryVal), addsubcategory)
  .get(getallsubcategories);

subCategoryrouter
  .route("/:id")
  .get(validation(paramsIdval), getsinglesubcategory)
  .put( validation(updatesubCategoryVal), updatesubcategory)
  .delete(validation(paramsIdval),deletesubcategory);
