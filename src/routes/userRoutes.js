

import { Router } from "express";
import { About, postUser, login, logOut, getProfile } from "../controllers/userController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/about", About)
router.post("/signup", postUser)
router.post("/login", login)
router.get("/logout", checkAuth, logOut)
router.get("/profile", checkAuth, getProfile)

export default router;