import multer from "multer";
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";

export const fileupload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
    
      cb(null, new mongoose.Types.ObjectId + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Please upload only images.", 400), false);
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};

export const uploadSingleFile = fieldName => fileupload().single(fieldName);
export const uploadArrayofFiles = fieldName =>fileupload().array(fieldName, 10);
export const uploadFields = fields =>  fileupload().fields(fields); 
