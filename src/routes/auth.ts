import express from 'express';
import { register , login} from '../controllers/authController';
import { /* authenticateToken, */ authenticateToken, userAuthMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

// Register a user
router.post('/register',register)

// Login a user with access token
router.post('/login',login)

export default router;