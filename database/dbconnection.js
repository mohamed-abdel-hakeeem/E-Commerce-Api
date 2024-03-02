import mongoose from "mongoose";

export const dbconnection =()=>{
    mongoose
    .connect("mongodb://localhost:27017/E-Commerce")
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log("datbsase error",err.message));
}