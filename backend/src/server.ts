import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3500;

connectDB();
app.listen(PORT,()=>{
    console.log(`Server connected on :: http://localhost:${PORT}`);
})