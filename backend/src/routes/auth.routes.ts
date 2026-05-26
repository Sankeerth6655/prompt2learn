import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/auth.controller";
import { protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',protectedRoute,getCurrentUser);

export default router;