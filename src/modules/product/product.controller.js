import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { ProductModel } from "../../../database/models/productModel.js";
import { deletOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apifeature.js";


const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  req.body.imgcover = req.files.imgcover[0].filename
req.body.images=req.files.images.map((img)=>img.filename)

  let product = new ProductModel(req.body);
  await product.save();
  res.json({ message: "success", product });
});

const getallProducts = catchError(async (req, res, next) => {

  let ApiFeatures = new ApiFeature(ProductModel.find(), req.query).filter().search().pagination().sort();

  let product = await  ApiFeatures.mongooseQuery
  res.json({ message: "success",page:ApiFeatures.pageNumber, product });
});

const getsingleProduct = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  res.json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if(req.files.imgcover)  req.body.imgcover = req.files.imgcover[0].filename;
  if(req.files.images)   req.body.images = req.files.images.map((img) => img.filename);

  let product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true });
  !product && res.satatus(404).json({ message: "Product not found" });
   product && res.json({ message: "success", product });

});

const deleteproduct = deletOne(ProductModel);
export { addProduct, getallProducts, getsingleProduct, updateProduct,deleteproduct };
