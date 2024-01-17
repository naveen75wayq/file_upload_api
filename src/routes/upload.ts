import express from 'express';
const router = express.Router();
import upload from '../middleware/uploadMiddleware'
import { getAllBuckets, getBucktPath, getFileFromBucket, uploadFileToBucket } from '../controllers/uploadController';
import { authenticateToken, userAuthMiddleware } from '../middleware/authMiddleware';



router.post("/upload",  userAuthMiddleware,/* authenticateToken, */ upload.single("myFile"),uploadFileToBucket);

router.get("/getAllBuckets", userAuthMiddleware,authenticateToken,getAllBuckets)
// get list of all files from a Particular bucket
router.get("/getAllFilesFromParticularBucket",userAuthMiddleware, authenticateToken,getFileFromBucket);


export default router;