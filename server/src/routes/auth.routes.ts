import { Router } from "express";

import { register } from "../controllers/auth.controller";

import { me } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
    
const router = Router();

router.post("/register", register);
router.get("/me", authenticate, me);

export default router;