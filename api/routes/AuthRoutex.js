import express from "express";
import { SignUp ,signin,google,signout } from "../controller/authController.js";

const router = express.Router();


router.post('/signup',SignUp);

router.post('/signin',signin);

router.post('/google',google);

router.get('/signout' ,signout);

export default router