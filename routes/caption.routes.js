import { Router } from "express";
import { body } from "express-validator";
import { captionsignup  , captionlogin, captionProfile, captionlogout} from "../controller/caption.controller.js";
import { authCaption } from "../middleware/auth.middleware.js";


const router = Router();

router.get("/" , (req , res) =>{
    res.json({
        message : "Caption route"
    })
});


router.post("/signup",[
    body("fullname").isLength({min:3}).withMessage("fullname is required"),
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({ min:3}).withMessage("password is required"),
    body("vehicle.color").isLength({min:3}).withMessage("color is required"),
    body("vehicle.plate").isLength({min:3}).withMessage("plate is required"),
    body("vehicle.capacity").isInt({min:1}).withMessage("capacity is required"),
    body("vehicle.vehicaltype").isIn(["car" , "bike" , "auto" , "bus"]).withMessage("vehical type is required"),
   
], 
captionsignup
)


router.post("/login" , [
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min:3}).withMessage("password is required")
    
] , captionlogin)


router.get("/profile" , authCaption , captionProfile);
router.get("/logout" , authCaption , captionlogout);


export default router