import { Router } from "express";
import { askQuestion, generateContent, generateRoadmap, generateTopic } from "../controllers/ai.controller";
import { protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

router.post('/generateTopic',protectedRoute,generateTopic);
router.post('/generateRoadmap',protectedRoute,generateRoadmap);
router.post('/generateContent',protectedRoute,generateContent);
router.post('/ask',protectedRoute,askQuestion);

export default router;