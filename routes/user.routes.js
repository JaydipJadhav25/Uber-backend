import { Router } from "express";
import { body } from "express-validator";
import { userlogin, userlogout, userProfile, userSignup } from "../controller/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/signup" ,[
    body('email').isEmail().withMessage('Invalide Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('first name must be at least 3 char'),
    body('password').isLength({min : 3}).withMessage('first name must be at least 5 char'),
]  , userSignup );

router.post("/login" ,[
    body('email').isEmail().withMessage('Invalide Email'),
    body('password').isLength({min : 3}).withMessage('first name must be at least 5 char'),
]  , userlogin );

// ...existing code...
router.get("/profile" , authUser , userProfile );
router.get("/logout" , authUser , userlogout);
// ...existing code...

export default router