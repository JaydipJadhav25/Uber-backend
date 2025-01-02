import { Router } from "express";

import { getaddrescorrdinates  , getAutoSuggestions, getDistanceTime} from "../controller/map.controller.js";



const router = Router();


router.get("/get-corrdinates", getaddrescorrdinates); 
router.get("/get-distancetime", getDistanceTime); 
router.get("/get-autosuggestions", getAutoSuggestions);



export default router;