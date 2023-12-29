import express from "express";
import { updateUser ,deleteUser } from "../controller/userController.js";
import { verifyUser } from "../utils/VerifyUser.js";
const router = express.Router();


router.post('/update/:id' ,verifyUser,updateUser);
router.delete('/delete/:id' ,verifyUser,deleteUser);


export default router