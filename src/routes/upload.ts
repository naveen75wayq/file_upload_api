import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import upload from '../middleware/uploadMiddleware'
import { getAllBuckets, getFileFromBucket, uploadFile, uploadFileToBucket } from '../controllers/uploadController';
import { authenticateToken, userAuthMiddleware } from '../middleware/authMiddleware';
import File from '../model/file'

//router.post('/upload',upload.single('file'), uploadFile)
router.post("/upload",  userAuthMiddleware,/* authenticateToken, */upload.single("myFile"),uploadFileToBucket);

router.get("/getAllBuckets", getAllBuckets)
// get list of all files from a Particular bucket
router.get("/getAllFilesFromParticularBucket",getFileFromBucket);
export default router;