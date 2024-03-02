import express from "express";

import { validation } from "../../midlleware/validation.js";

import { uploadFields, uploadSingleFile } from "../../services/fileuploads/fileupload.js";
import { addproductVal, paramsIdval, updateProductVal } from "./product.Validation.js";
import { addProduct, deleteproduct, getallProducts, getsingleProduct, updateProduct } from "./product.controller.js";

export const productrouter = express.Router();

productrouter
  .route("/") 
  .post(uploadFields( [{ name: 'imgcover', maxCount: 1 }, { name: 'images', maxCount: 10 }]), validation(addproductVal), addProduct)
  .get(getallProducts);

productrouter
  .route("/:id")
  .get(validation(paramsIdval), getsingleProduct)
  .put(uploadFields([{ name: 'imgcover', maxCount: 1 }, { name: 'images', maxCount: 10 }],),validation(updateProductVal), updateProduct)
  .delete(deleteproduct);
