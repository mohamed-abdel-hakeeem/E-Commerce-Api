import { globalError } from "../midlleware/globalError.js";
import { addressRouter } from "./Adress/address.routes.js";
import { categoryrouter } from "./Category/category.routes.js";
import { couponRouter } from "./Coupon/coupon..routes.js";
import { authrouter } from "./auth/auth.routes.js";


import { Brandrouter } from "./brand/brand.routes.js";
import { cartRouter } from "./cart/cart.routes.js";
import { orderRouter } from "./order/order.routes.js";
import { productrouter } from "./product/product.routes.js";

import { Reviewrouter } from "./review/review.routes.js";
import { subCategoryrouter } from "./subcategory/subcategory.routes.js";
import { userrouter } from "./user/user.routes.js";
import { wishListRouter } from "./wish list/wishList.routes.js";



export const bootstrap = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello World!");  });
  app.use('/api/v1/categories', categoryrouter);
  app.use('/api/v1/subcategories', subCategoryrouter);
  app.use('/api/v1/brands', Brandrouter);
  app.use('/api/v1/products', productrouter);
  app.use('/api/v1/auth', authrouter);
  app.use('/api/v1/users', userrouter);
  app.use('/api/v1/reviews',Reviewrouter);
  app.use('/api/v1/wishlist',wishListRouter);
  app.use('/api/v1/address',addressRouter);
  app.use('/api/v1/coupons',couponRouter);
  app.use('/api/v1/cart',cartRouter);
  app.use('/api/v1/order',orderRouter);

  

  

  app.use(globalError)
}