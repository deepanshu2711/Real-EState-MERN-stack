import express from "express";
import { SignUp } from "../controller/authController.js";

const router = express.Router();


router.post('/signup',SignUp);



export default router