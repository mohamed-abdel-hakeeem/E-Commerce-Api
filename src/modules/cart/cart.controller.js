import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../database/models/cartModel.js";
import { ProductModel } from "../../../database/models/productModel.js";
import { couponModel } from "../../../database/models/copounModel.js";

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;
  if (cart.discount) {
    let totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    cart.totalPrice = totalPriceAfterDiscount;
  }
};

const addToCart = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.body.product);
  if (!product) return next(new AppError("product not found", 404));
  if (req.body.quantity > product.quantity)
    return next(new AppError("sold out"));
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: { _id: req.user._id } });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    !cart && res.satatus(404).json({ message: "cart not found" });
    cart && res.json({ message: "success", cart });
  } else {
    let item = isCartExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    if (item) {
      if (item.quantity >= product.quantity)
        return next(new AppError("sold out"));
      item.quantity = item.quantity + req.body.quantity || 1;
    } else {
      isCartExist.cartItems.push(req.body);
    }
    calcTotalPrice(isCartExist);
    await isCartExist.save();
    isCartExist && res.json({ message: "success", isCartExist });
  }
});

const removeItemFromCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  calcTotalPrice(cart);
  await cart.save();
  !cart && res.satatus(404).json({ message: "cart not found" });
  cart && res.json({ message: "success", cart });
});

const updateQuantity = catchError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  !cart && res.satatus(404).json({ message: "cart not found" });
  let item = cart.cartItems.find((item) => item._id == req.params.id);
  if (!item) return next(new AppError("item not found", 404));
  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();
  cart && res.json({ message: "success", cart });
});

const getloggedUserCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  !cart && res.satatus(404).json({ message: "cart not found" });
  cart && res.json({ message: "success", cart });
});
const clearUserCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndDelete({ user: req.user._id });
  !cart && res.satatus(404).json({ message: "cart not found" });
  cart && res.json({ message: "success", cart });
});
const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.code,
    expires: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("coupon not found", 404));
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 404));
  let totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.totalPrice = totalPriceAfterDiscount;
  cart.discount = coupon.discount;
  await cart.save();
});
export {
  addToCart,
  removeItemFromCart,
  updateQuantity,
  getloggedUserCart,
  clearUserCart,
};
