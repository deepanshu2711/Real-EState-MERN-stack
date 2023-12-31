import express from "express";
import { createListing } from "../controller/ListingController.js";
import { verifyUser } from "../utils/VerifyUser.js";
import {deleteListing} from "../controller/ListingController.js"
const router = express.Router();


router.post("/create" ,verifyUser,createListing);
router.delete("/delete/:id" ,verifyUser,deleteListing);


export default router;
