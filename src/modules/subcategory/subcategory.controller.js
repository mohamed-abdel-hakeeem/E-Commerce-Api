import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { subCategoryModel } from "../../../database/models/subCategoryModel.js";
import { deletOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apifeature.js";

const addsubcategory = catchError(async (req, res, next) => {
  // req.body.slug = slugify(req.body.name);
  let subcategory = new subCategoryModel(req.body);
  console.log(subcategory);
  await subcategory.save();
  res.json({ message: "success", subcategory });
});

const getallsubcategories = catchError(async (req, res, next) => {
   let filterobj = {}
  if (req.params.category) {
    filterobj.category=req.params.category
  }

  let ApiFeatures = new ApiFeature(subCategoryModel.find(filterobj), req.query).filter().search().pagination().sort();

  let subcategories = await  ApiFeatures.mongooseQuery
  res.json({ message: "success",page:ApiFeatures.pageNumber, subcategories });
  
});

const getsinglesubcategory = catchError(async (req, res, next) => {
  let subcategory = await subCategoryModel.findById(req.params.id);
  !subcategory && res.satatus(404).json({ message: "category not found" });

  subcategory && res.json({ message: "success", subcategory });
  
});

const updatesubcategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let subcategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !subcategory && res.satatus(404).json({ message: "category not found" });

  subcategory && res.json({ message: "success", subcategory });
});

const deletesubcategory = deletOne(subCategoryModel);
export {
  addsubcategory,
  getallsubcategories,
  getsinglesubcategory,
  updatesubcategory,
  deletesubcategory
};
