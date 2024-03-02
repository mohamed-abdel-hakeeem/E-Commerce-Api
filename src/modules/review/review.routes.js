import express from "express";
import { validation } from "../../midlleware/validation.js";
import { addReviewVal, paramsIdval, updateReviewVal } from "./review.Validation.js";
import { addReview, deleteReview, getallReviews, getsingleReview, updateReview } from "./review.controller.js";
import { allowedTo, protectedroutes } from "../auth/auth.controller.js";


export const Reviewrouter = express.Router();

Reviewrouter
  .route("/")
  .post( protectedroutes,allowedTo("user"),validation(addReviewVal),addReview)
  .get(getallReviews);

Reviewrouter
  .route("/:id")
  .get(validation(paramsIdval),getsingleReview)
  .put(protectedroutes ,allowedTo("user"),validation(updateReviewVal),updateReview)
  .delete(protectedroutes,allowedTo("admin","user"),validation(paramsIdval),deleteReview);
