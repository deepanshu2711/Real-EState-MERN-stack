import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const SignUp =async(req,res,next)=>{
   const {username,email,password} = req.body;
   try {
    const hasshedPassword =bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hasshedPassword});
    await newUser.save();
    res.status(201).json("user created");
   } catch (error) {
    next();
   }
}