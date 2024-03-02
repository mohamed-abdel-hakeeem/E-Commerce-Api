import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { BrandModel } from "../../../database/models/brandModel.js";
import { deletOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apifeature.js";
import { application } from "express";

const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new BrandModel(req.body);
  console.log(brand);
  await brand.save();
  res.json({ message: "success", brand });
});

const getallBrands = catchError(async (req, res, next) => {
  let ApiFeatures = new ApiFeature(BrandModel.find(), req.query).filter().search().pagination().sort();
  let brands = await  ApiFeatures.mongooseQuery
  res.json({ message: "success",page:ApiFeatures.pageNumber, brands });
});

const getsingleBrand = catchError(async (req, res, next) => {
  let brand = await BrandModel.findById(req.params.id);

  res.json({ message: "success", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  let brand = await BrandModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !brand && res.satatus(404).json({ message: "Brand not found" });

  brand && res.json({ message: "success", brand });
});

const deleteBrand = deletOne(BrandModel);
export { addBrand, getallBrands, getsingleBrand, updateBrand, deleteBrand };
