import User from "../model/user";
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../loadEnv';
import {Response, Request, NextFunction} from 'express'
import crypto from 'crypto'
export interface CustomRequest extends Request{
    apiKey?: string;
    user?: {
      userId: string;
      email: string;
      roles: string; 
  }
}
export function authenticateToken(req: any, res: any, next: any) {
   
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized - Missing token', message: 'Login required!'
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
            
            if (user && user.roles[0] === 'admin') {
                // Generate a unique API key
                const apiKey = crypto.randomBytes(16).toString('hex');
                
                // Set the apiKey ißn the request object
                req.apiKey = apiKey;
                req.user=user;
                // Continue to the next middleware or route
                next();
              }else if(user && user.roles === 'user'){
                req.user=user
                next()
              }else {
                res.status(403).json({ error: 'Forbidden. Only admin can perform this action' });
              }
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
export  function restrictUser(role: any) {
    return (req: any, res: any, next: any) => {
        if (req.user.roles != role) {
            res.json({ message: 'You do not have permission to execute this action' })
            next({ error: 'Unauthorized access' })
        }
        next()
    }
}
