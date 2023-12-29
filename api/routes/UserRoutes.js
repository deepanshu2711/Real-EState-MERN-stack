import express from "express";
import { updateUser } from "../controller/userController.js";
import { verifyUser } from "../utils/VerifyUser.js";
const router = express.Router();


router.post('/update/:id' ,verifyUser,updateUser);


export default router