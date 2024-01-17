import User from "../model/user";
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../loadEnv';
export function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized - Missing token'
        });
    }
    jwt.verify(token,
        JWT_KEY as string,
        (err: any, user: any) => {
            if (err) {
                return res.status(403).json({
                    error: 'Unauthorized - Invalid token'
                })
            }
            req.user = user
            next();
        });


}
export const userAuthMiddleware = async (req: any, res: any, next: any) => {
    try {
        const apiKey = req.query.apiKey;
        console.log(apiKey);
        if (!apiKey) {
            return res.status(401).json({
                error: 'Unauthorized - Invalid API Key'
            });
        }
        const user = await User.findOne({ api: apiKey }).exec();
        console.log(user);
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized - Missing token'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}

