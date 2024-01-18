import express from 'express';
const router = express.Router();
import upload from '../middleware/uploadMiddleware'
import { uploadFileToBucket } from '../controllers/uploadController';
import { authenticateToken } from '../middleware/authMiddleware';

// Upload files to a bucket
router.post("/upload",  authenticateToken, upload.single("myFile"),uploadFileToBucket);
export default router;