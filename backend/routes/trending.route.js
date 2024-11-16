import express from "express";
import { getTrending } from "../controllers/trending.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getTrending); 

export default router;
