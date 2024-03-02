import { CategoryModel } from "../../../database/models/CategoryModel.js";
import slugify from "slugify";
import { catchError } from "../../midlleware/CatchError.js";
import { ApiFeature } from "../../utils/apifeature.js";


const addcategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename
 

  let category = new CategoryModel(req.body);
  console.log(category);
  await category.save();
  res.json({ message: "success", category });
}
)


const getallcategories = catchError(async (req, res, next) => {
  let ApiFeatures = new ApiFeature(CategoryModel.find(), req.query).filter().search().pagination().sort();
  let category = await  ApiFeatures.mongooseQuery
  res.json({ message: "success",page:ApiFeatures.pageNumber, category });
}
)

const getsinglecategory = catchError(async (req, res, next) => {
  let Category = await CategoryModel.findById(req.params.id);

  res.json({ message: "success", Category });
})

const updatecategory = catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name);  
  if(req.file) req.body.image =req.file.filename
  let Category = await CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true}); 
  !Category && res.satatus(404).json({ message: "category not found" });
  
  Category&&res.json({ message: "success", Category });
})
  
const deletecategory = catchError(async (req, res, next) => {
        
  let category = await CategoryModel.findByIdAndDelete(req.params.id); 
  !category&& res.satatus(404).json({ message: "category not found" });
  category&&res.json({ message: "success", category });
})
export { addcategory, getallcategories, getsinglecategory,updatecategory,deletecategory };
