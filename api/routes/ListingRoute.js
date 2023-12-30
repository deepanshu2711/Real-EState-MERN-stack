import express from "express";
import { createListing } from "../controller/ListingController.js";
import { verifyUser } from "../utils/VerifyUser.js";
const router = express.Router();


router.post("/create" ,verifyUser,createListing);


export default router;
