import express from "express";
import { SignUp ,signin,google } from "../controller/authController.js";

const router = express.Router();


router.post('/signup',SignUp);

router.post('/signin',signin);

router.post('/google',google);

export default router