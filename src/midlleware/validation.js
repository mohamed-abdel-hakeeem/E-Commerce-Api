import { AppError } from "../utils/AppError.js";

export const validation = (schema) => {
    return (req, res, next) => {
        let filter={};
        if (req.file) {
            filter={image:req.file,...req.body,...req.params,...req.query}
        } else {
            filter={...req.body,...req.params,...req.query}
        }
        const { error } = schema.validate( filter, { abortEarly: false } );
        if (!error) {
            next();
        } else {
            let errlist = []
            error.details.forEach(val => {
                errlist.push(val.message)               
            });
            next(new AppError(errlist, 401))
        }
    };
}