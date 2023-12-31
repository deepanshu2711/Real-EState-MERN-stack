import express from "express";
import { updateUser ,deleteUser, getuserListing, getUser } from "../controller/userController.js";
import { verifyUser } from "../utils/VerifyUser.js";
const router = express.Router();


router.post('/update/:id' ,verifyUser,updateUser);
router.delete('/delete/:id' ,verifyUser,deleteUser);
router.get('/listings/:id' ,verifyUser , getuserListing)
router.get('/:id' ,verifyUser,getUser);
export default router