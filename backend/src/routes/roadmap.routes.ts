import { Router } from "express";
import { createRoadmap, deleteRoadmap, getAllRoadmapsByUserId, getRoadmapById, updateRoadmap } from "../controllers/roadmap.controller";
import { protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

router.post('/',protectedRoute,createRoadmap);
router.get('/',protectedRoute,getAllRoadmapsByUserId);
router.get('/:roadmapId',protectedRoute,getRoadmapById);
router.patch('/:roadmapId',protectedRoute,updateRoadmap);
router.delete('/:roadmapId',protectedRoute,deleteRoadmap);

export default router;