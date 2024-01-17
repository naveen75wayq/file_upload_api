import { Response, Request } from "express";

export const uploadFile = async(req: Request, res: Response)=>{
    try{
        const { filename } = req.body;
        return res.send(filename)
    }catch(error){
        console.error('Error uploading file', error)
        return res.status(200).json({erorr: 'Internal filesystem error', message: 'Check filesystem and try again'})
    }
}