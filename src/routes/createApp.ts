import express from 'express';
import { createApplication } from '../controllers/appController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

// create a bucket
router.post('/createapp',authenticateToken,createApplication)
export default router;