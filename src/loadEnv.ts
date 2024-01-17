import dotenv from 'dotenv';
import path from 'path';
export const envPath = path.resolve('src/.env')
dotenv.config({ path: envPath })


export const ATLAS_PASS = process.env.ATLAS_PASS;
export const JWT_KEY = process.env.JWT_KEY