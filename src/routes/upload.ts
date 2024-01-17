import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import upload from '../middleware/multer'
import { uploadFile } from '../controllers/uploadController';


router.post('/upload',upload.single('file'), (req:any,res:any,next:any)=>{
        try{
            return res.status(201).json({
                message: 'File uploade success!'
            })
        }catch(err){
            console.error(err)
        }
})
export default router;