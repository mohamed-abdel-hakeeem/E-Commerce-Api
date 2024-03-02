import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { AppError } from "../../utils/AppError.js";
import userModel from "../../../database/models/userModel.js";

const addTowishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishList: req.body.product } },
      { new: true }
    )
    .populate("wishList");
  !wishlist && res.satatus(404).json({ message: "wishList not found" });

  wishlist && res.json({ message: "success", wishlist: wishlist.wishList });
});

const removeFromwishlist = catchError(async (req, res, next) => {
  let wishlist = await userModel
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { wishList: req.params.id } },
      { new: true }
    )
    .populate("wishList");
  !wishlist && res.satatus(404).json({ message: "wishList not found" });
  wishlist &&
    res.json({
      message: "success,product removed from wishlist",
      wishlist: wishlist.wishList,
    });
});
const getloggeduserwishlist = catchError(async (req, res, next) => {
  let wishlist  = await userModel.findById(req.user._id);
  !wishlist && res.status(404).json({ message: "wishList not found" });
   wishlist && res.json({ message: "success", wishlist });
});

export { addTowishlist, removeFromwishlist, getloggeduserwishlist };
