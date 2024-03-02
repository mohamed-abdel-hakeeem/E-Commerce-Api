import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { deletOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apifeature.js";
import { reviewModel } from "../../../database/models/reviewModel.js";
import { AppError } from "../../utils/AppError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id
  let isExist = await reviewModel.findOne({ product: req.body.product, user: req.user._id })
  if(isExist) return next(new AppError("review already exist", 401))
  let review = new reviewModel(req.body);
  await review.save();
  res.json({ message: "success",review });
});

const getallReviews = catchError(async (req, res, next) => {
  let ApiFeatures = new ApiFeature(reviewModel.find({}), req.query).filter().search().pagination().sort();
  let review = await  ApiFeatures.mongooseQuery
  res.json({ message: "success",page:ApiFeatures.pageNumber, review });
  
});

const getsingleReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findById(req.params.id);
  !review && res.satatus(404).json({ message: "review not found" });
  review && res.json({ message: "success", review });
});

const updateReview= catchError(async (req, res, next) => {
  let review = await reviewModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  !review && res.satatus(404).json({ message: "review not found" });

  review && res.json({ message: "success", review });
});

const deleteReview = deletOne(reviewModel);
export {
  addReview,
  getallReviews,
  getsingleReview,
  updateReview,
  deleteReview
};
