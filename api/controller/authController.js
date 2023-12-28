import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const SignUp =async(req,res,next)=>{
   const {username,email,password} = req.body;
   try {
    const hasshedPassword =bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hasshedPassword});
    await newUser.save();
    res.status(201).json("user created");
   } catch (error) {
    next(error);
   }
}


export const signin =async(req,res ,next)=>{
   const {email,password} = req.body;
   try {
      const valid_user = await User.findOne({email});
      if(!valid_user) return next(errorHandler(404,"user not found"));
      const isMatch =bcryptjs.compareSync(password,valid_user.password);
      if(!isMatch) return next(errorHandler(401,"invalid credentials"));
      const token = jwt.sign({id:valid_user._id} ,process.env.JWT_SECRET);
      res.cookie('access_token' , token ,{
         httpOnly:true,
      })
      res.status(200).json(valid_user);
   } catch (error) {
      next(error);
   }
}