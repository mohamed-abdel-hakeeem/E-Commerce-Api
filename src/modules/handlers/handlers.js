import { catchError } from "../../midlleware/CatchError.js";


export const deletOne = (model) => {

    return catchError(async (req, res, next) => {
        let subcategory = await model.findByIdAndDelete(req.params.id);
        !subcategory && res.satatus(404).json({ message: "category not found" });
        subcategory && res.json({ message: "success", subcategory });
      });
    
}