import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
    SavePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);

router.get("/following", protectRoute, getFollowingPosts);

router.get("/likes/:id", protectRoute, (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ error: "User ID is required" });
	}
	next();
}, getLikedPosts);

router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/save/:post_id/:user_id", protectRoute, SavePost)

export default router;
