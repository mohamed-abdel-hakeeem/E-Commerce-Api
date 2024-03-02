import express from "express";

import { validation } from "../../midlleware/validation.js";

import { uploadSingleFile } from "../../services/fileuploads/fileupload.js";
import { addBrandVal, paramsIdval, updateBrandVal } from "./brand.Validation.js";
import { addBrand, deleteBrand, getallBrands, getsingleBrand, updateBrand } from "./brand.controller.js";
export const Brandrouter = express.Router();

Brandrouter
  .route("/") 
  .post(uploadSingleFile('logo'), validation(addBrandVal), addBrand)
  .get(getallBrands);

Brandrouter
  .route("/:id")
  .get(validation(paramsIdval), getsingleBrand)
  .put(uploadSingleFile('logo'),validation(updateBrandVal), updateBrand)
  .delete(deleteBrand);
