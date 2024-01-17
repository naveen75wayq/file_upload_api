import express from 'express';
import { register , login} from '../controllers/authController';
import { authenticateToken, userAuthMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/register', register)
router.post('/login',userAuthMiddleware ,login)

export default router;