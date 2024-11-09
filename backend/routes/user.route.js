import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { 
    followUnfollowUser, 
    getSuggestedUsers, 
    getUserProfile, 
    updateUser, 
} from "../controllers/user.controller.js";

const router = express.Router();

// Route to get a user's profile by username
router.get("/profile/:username", protectRoute, getUserProfile);

router.get("/suggested", protectRoute, getSuggestedUsers);

// Route to follow/unfollow a user by their ID
router.post("/follow/:id", protectRoute, followUnfollowUser);

// Route to update user information
router.post("/update", protectRoute, updateUser);


export default router;
