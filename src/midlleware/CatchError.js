import { AppError } from "../utils/AppError.js";
import userModel from "../../database/models/userModel.js";
export function catchError(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next (new AppError(err, 500))
        })
    }
}