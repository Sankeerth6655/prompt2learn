import { Router } from "express";
import { createRoadmap, deleteRoadmap, getAllRoadmapsByUserId, getRoadmapById } from "../controllers/roadmap.controller";
import { protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

router.post('/',protectedRoute,createRoadmap);
router.get('/',protectedRoute,getAllRoadmapsByUserId);
router.get('/:roadmapId',protectedRoute,getRoadmapById);
router.delete('/:roadmapId',protectedRoute,deleteRoadmap);


export default router;