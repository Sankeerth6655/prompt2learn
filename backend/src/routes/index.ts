import { Router } from "express";
import healthRouter from './health.routes';
import authRouter from './auth.routes';
import aiRouter from './ai.routes';
import roadmapRouter from './roadmap.routes';

const router = Router();

router.use('/health',healthRouter);
router.use('/auth',authRouter);
router.use('/roadmap',roadmapRouter);
router.use('/ai',aiRouter);


export default router;