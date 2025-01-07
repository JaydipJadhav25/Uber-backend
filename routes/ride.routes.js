import { Router } from "express";
import { createride, getFare } from "../controller/ride.controller.js";

const router = Router();



router.post("/create" , createride);

router.get("/get-fare" , getFare);



export default router;