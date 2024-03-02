import { catchError } from "../../midlleware/CatchError.js";
import { deletOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apifeature.js";
import { AppError } from "../../utils/AppError.js";
import { couponModel } from "../../../database/models/copounModel.js";

const addCoupon = catchError(async (req, res, next) => {
  let isExist = await couponModel.findOne({ code: req.body.code });
  if (isExist) return next(new AppError("coupon already exist", 401));
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.json({ message: "success", coupon });
});

const getallCoupons = catchError(async (req, res, next) => {
  let ApiFeatures = new ApiFeature(couponModel.find({}), req.query)
    .filter()
    .search()
    .pagination()
    .sort();
  let coupon = await ApiFeatures.mongooseQuery;
  res.json({ message: "success", page: ApiFeatures.pageNumber, coupon });
});

const getsingleCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findById(req.params.id);
  !coupon && res.satatus(404).json({ message: "review not found" });
  coupon && res.json({ message: "success", coupon });
});

const updateCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  !coupon && res.satatus(404).json({ message: "coupon not found" });
  coupon && res.json({ message: "success", coupon });
});

const deleteCoupon = deletOne(couponModel);
export {
  addCoupon,
  getallCoupons,
  getsingleCoupon,
  updateCoupon,
  deleteCoupon
};
