import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";

export const updateUser =async(req,res,next) =>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,"you can update only your account"));
    }else{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }},{new:true});
        res.status(200).json(updatedUser);
    }
}