import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { AppError } from "../../utils/AppError.js";
import userModel from "../../../database/models/userModel.js";

const addAddress = catchError(async (req, res, next) => {
  let address = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { addresses: req.body } },
      { new: true }
    )
  !address && res.satatus(404).json({ message: "address not found" });

  address && res.json({ message: "success", address: address.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
  let address = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses:{ _id: req.params.id} } },
      { new: true })
  !address && res.satatus(404).json({ message: "address not found" });
  address && res.json({ message: "success",   address: address.addresses });
});
const getloggeduserAddress = catchError(async (req, res, next) => {
  let { addresses }  = await userModel.findById(req.user._id);
  addresses && res.json({ message: "success", addresses });
});

export { addAddress,removeAddress,getloggeduserAddress };
