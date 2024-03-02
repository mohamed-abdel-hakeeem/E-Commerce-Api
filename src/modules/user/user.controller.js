
import { catchError } from "../../midlleware/CatchError.js";

import { deletOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apifeature.js";
import  userModel  from "../../../database/models/userModel.js";

const adduser = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();
  res.json({ message: "success", user });
});

const getallusers = catchError(async (req, res) => {

  let ApiFeatures = new ApiFeature(userModel.find(), req.query).filter().search().pagination().sort();

  let users = await  ApiFeatures.mongooseQuery
  res.json({ message: "success",page:ApiFeatures.pageNumber, users });
  
});

const getsingleuser = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  !user && res.satatus(404).json({ message: "user not found" });

  user && res.json({ message: "success", user });
  
});

const updateuser = catchError(async (req, res, next) => {
 
  let user = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !user && res.satatus(404).json({ message: "user not found" });

  user && res.json({ message: "success", user });
});

const deleteUser = deletOne(userModel);
export {
  adduser,
  getallusers,
  getsingleuser,
  updateuser,
  deleteUser
};
