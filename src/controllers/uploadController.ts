import File from "../model/file";
import fs from 'fs';
import path from 'path';
export const uploadFile = (req: any, res: any, next: any) => {
    try {
        if (req.file) {
            return res.status(201).json({
                message: 'File upload success!',
                file: req.file
            })
        } else {
            return res.status(404).json({
                error: 'Empty file field',
                message: 'Select a file to upload'
            })
        }
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: 'Internal filesystem error',
            message: 'Please check the filesystem and try again'
        })
    }
}
export const uploadFileToBucket = async (req: any, res: any, next: any) => {
    if (req.file) {
        const filefullPath = req.body.destination + '/' + req.file.originalname;
        console.log(filefullPath)
        //const uploaded = new File({ userId: req.user._id, filename: req.file.originalname, mimeType: req.file.mimetype, path: filefullPath });
        const uploaded = await File.create({ userId: req.user._id, filename: req.file.originalname, mimeType: req.file.mimetype, path: filefullPath });
        console.log(uploaded)
        await uploaded.save();
        res.json({ status: true, success: "File Uploaded Successfully" });
    }
};

export const getAllBuckets = async (req: any, res: any) => {
    const directoryPath = path.join('bucket');
    console.log(directoryPath)
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        const directories = files.filter(file => {
            const filePath = path.join(directoryPath, file);
            return fs.statSync(filePath).isDirectory();
        });

        return res.json({ status: true, success: directories });
    });
}
export const getFileFromBucket = async (req: any, res: any) => {
    try {
        const bucketName = req.body.bucketName;
        const directoryPath = path.join(`bucket/${bucketName}`);

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return res.json({ status: false, message: `${bucketName}, No Such Bucket Found` });
            }

            const allfiles = files.filter(file => {
                const filePath = path.join(directoryPath, file);
                return fs.statSync(filePath).isFile();
            });

            console.log(allfiles);
            return res.json({ status: true, filesList: allfiles });
        });
    } catch (error) {
        console.error(error);
    }
}
export const getBucktPath = async (req: any, res: any,next:any) => {
    const {bucketName} = req.body
    console.log(bucketName)
   
    next()

}
