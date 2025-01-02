import { Router } from "express";
import { createride } from "../controller/ride.controller.js";

const router = Router();



router.post("/create" , createride);



export default router;