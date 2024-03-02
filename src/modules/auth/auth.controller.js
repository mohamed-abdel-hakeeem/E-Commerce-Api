import jwt from "jsonwebtoken";
import { catchError } from "../../midlleware/CatchError.js";
import userModel from "../../../database/models/userModel.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError.js";
import 'dotenv/config'

const signup = catchError(async (req, res) => {
  let user =new userModel(req.body);
     await user.save()
  res.json({ message:"success", user });
});

const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return next(new AppError("email not correct", 401));
  const compare = bcrypt.compareSync(req.body.password, user.password)
  if(compare)  {
    let token =  jwt.sign({ _id: user._id, role: user.role },process.env.SECRET_KEY);
    return res.json({ message: "success", token });
  } else {
    next(new AppError("invalid email or password", 401));
  }
});

const changepassword = catchError(async (req, res,next) => {
  let user = await userModel.findById(req.params.id);
  let compare=bcrypt.compare(req.body.password, user.password)
  if (user&&compare) {
    let token = jwt.sign({ _id: user._id, role: user.role },process.env.SECRET_KEY)
   userModel.findByIdAndUpdate(req.params.id,{password:req.body.newpassword});
    return res.json({ message: "success", token });
  }  else {
    next(new AppError("invalid email or password", 401));
  }
  
});

const protectedroutes = catchError(async (req, res, next) => {
  let  token  = req.headers.token
  //1-check token
  if (!token) return next(new AppError("please login first", 401))
  //2-verify token
  let decoded = jwt.verify(token,process.env.SECRET_KEY);
  console.log(decoded);
  //3-check user
  let user = await userModel.findById(decoded._id)
  if (!user) return next(new AppError("user not found", 401))
  if (user.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
    if (time > decoded.iat) return next(new AppError("invalid token ", 401))
  }
  req.user=user
  next()
})

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next (new AppError("you are not allowed to do that", 401))
    }
    next()
  })
}

export { signup, signin, changepassword,protectedroutes,allowedTo };
