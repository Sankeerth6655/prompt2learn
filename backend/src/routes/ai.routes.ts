import { Router } from "express";
import { generateContent, generateRoadmap, generateTopic } from "../controllers/ai.controller";

const router = Router();

router.post('/generateTopic',generateTopic);
router.post('/generateRoadmap',generateRoadmap);
router.post('/generateContent',generateContent);

export default router;