import { catchError } from "../../midlleware/CatchError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../database/models/cartModel.js";
import { orderModel } from "../../../database/models/orderModel.js";
import { ProductModel } from "../../../database/models/productModel.js";

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OpYuCAKQMRQwUzkMGBxGjyM2bYfGdLWiFdyEWnZXTiMMT4yW24MrAYUbIsO7IMkMECAHbYPEEiezWtLlS7SDH9700Xty9lckh"
);

const createOrder = catchError(async (req, res, next) => {
  //check cart
  let cart = await cartModel.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  //calc total order price
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  //create order
  let order = new orderModel({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();
  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
      },
    };
  });
  await ProductModel.bulkWrite(options);

  //clear cart after made order
  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ messade: "sucsses", order });
});

const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel
    .findById({ user: req.user._id })
    .populate("cartItems.product");
  res.status(200).json({ message: "sucsses", order });
});
const getAllOrder = catchError(async (req, res, next) => {
  let order = await orderModel.find({}).populate("cartItems.product");
  res.status(200).json({ message: "sucsses", order });
});

const createCheckOutSession = catchError(async (req, res, next) => {
  //check cart
  let cart = await cartModel.findById(req.params.id);
  //calc total order price
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata:req.body.shippingAddress
  });
  res.json({message:"sucsses",session})
});
export { createOrder, getSpecificOrder, getAllOrder };
