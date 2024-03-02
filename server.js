import express from "express";
import { dbconnection } from "./database/dbconnection.js";
import { categoryrouter } from "./src/modules/Category/category.routes.js";
import { bootstrap } from "./src/modules/index.routes.js";
import dotenv from "dotenv"
const app = express();
const PORT = 8000;
app.use(express.json());
app.use('/uploads', express.static("uploads"));
bootstrap(app);
dbconnection();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
