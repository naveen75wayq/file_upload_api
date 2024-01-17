import express, { NextFunction, Request, Response } from 'express';
import { createApplication } from '../controllers/appController';
import { authenticateToken, userAuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();



router.post('/createapp',userAuthMiddleware ,authenticateToken,createApplication)
export default router;