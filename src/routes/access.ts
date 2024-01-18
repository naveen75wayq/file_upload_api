import express from 'express';
import { getAllBuckets, getFileFromBucket } from '../controllers/uploadController';
import { authenticateToken, userAuthMiddleware } from '../middleware/authMiddleware';
const router = express.Router();
// To get list of all buckets
router.get("/getAllBuckets",authenticateToken,getAllBuckets)

router.get("/getAllFilesFromParticularBucket", authenticateToken, getFileFromBucket);
router.get('/getBucket',authenticateToken)

export default router;