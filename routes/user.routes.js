import { Router } from "express";
import { body } from "express-validator";
import { userSignup } from "../controller/user.controller.js";


const router = Router();

router.post("/signup" ,[
    body('email').isEmail().withMessage('Invalide Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('first name must be at least 3 char'),
    body('password').isLength({min : 3}).withMessage('first name must be at least 5 char'),
]  , userSignup )



export default router