import { Router } from "express";
import { getMyProfile, updateProfile } from "../controllers/profile.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta protegida → solo usuarios autenticados con JWT
router.get("/me", authenticateToken, getMyProfile);
router.put("/update", authenticateToken, updateProfile);

export default router;
