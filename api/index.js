import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>console.log("DB connected"))   //application string

const app = express();

app.listen(3000,()=>{
    console.log("Server Running on port 3000..")
});
