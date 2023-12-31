import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/ListingModel.js";

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


export const deleteUser = async(req,res,next) =>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(403,"you can delete only your account"));
    }else{
        try {
            await User.findByIdAndDelete(req.params.id);
            res.clearCookie("access_token");
            res.status(200).json("user has been deleted");
        } catch (error) {
            next(error)
        }
    }
}



export const getuserListing = async(req,res,next) =>{
    if(req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef:req.user.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(403,"you can update only your account"));
    }
}


export const getUser =async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(errorHandler(404,"User does not exist"));
        }
        const {password:pass, ...rest} =user._doc
        res.status(200).json(rest);
        
    } catch (error) {
        next(error)
    }
}