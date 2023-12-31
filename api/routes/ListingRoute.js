import express from "express";
import { createListing, getListing, updateListing } from "../controller/ListingController.js";
import { verifyUser } from "../utils/VerifyUser.js";
import {deleteListing} from "../controller/ListingController.js"
const router = express.Router();


router.post("/create" ,verifyUser,createListing);
router.delete("/delete/:id" ,verifyUser,deleteListing);
router.post("/update/:id" ,verifyUser,updateListing);
router.get("/get/:id",getListing);



export default router;
