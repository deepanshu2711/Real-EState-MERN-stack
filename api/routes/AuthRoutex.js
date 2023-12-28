import express from "express";
import { SignUp ,signin } from "../controller/authController.js";

const router = express.Router();


router.post('/signup',SignUp);

router.post('/signin',signin)

export default router