
import Listing from "../models/ListingModel.js";
import { errorHandler } from "../utils/error.js";
export const createListing =async(req,res,next) => {
    
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}                       



export const deleteListing =async(req,res,next) =>{
    
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing does not exist"));
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(403,"you can delete only your listing"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("listing has been deleted");
    } catch (error) {
        next(error)
    }
}

export const updateListing =async(req,res,next) =>{
    const listing  =await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,"Listing does not exist"));
    }
    if(req.user.id !== listing.userRef ){
        return next(errorHandler(403,"you can update only your listing"));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
}