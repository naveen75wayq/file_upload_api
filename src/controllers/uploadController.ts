import File from "../model/file";
import fs from 'fs';
import path from 'path';
import  User from "../model/user";


export const uploadFileToBucket = async (req: any, res: any, next: any) => {
    if (req.file) {
        
        const filefullPath = req.file.destination  + req.file.originalname;
        const uploaded = await File.create({ userId: req.user.id, filename: req.file.originalname, mimeType: req.file.mimetype, path: filefullPath });
        const user  = await User.findById(req.user.id)
        if (user) {
            if (user.uploads) {
              user.uploads.push(uploaded.id);
            } else {
              user.uploads = [uploaded.id];
            }
            await user.save();
          } else {
            console.error('User not found.');
          }
        console.log(uploaded)
        await uploaded.save();
        res.json({ status: true, success: "File Uploaded Successfully" });
    }
};

export const getAllBuckets = async (req: any, res: any) => {
    const directoryPath = path.join('bucket');
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
/* export const userController = async (req: any, res: any) => {
    const { id } = req.params;
    const { decoded } = req; // Access the apiKey set by the middleware
    try {
      const findAppName = await App.findOne({ _id: id });
      if (findAppName) {
        const whitelistedDomains = findAppName.whitelistedDomains;
        const isWhitelisted = whitelistedDomains.includes(decoded?.email);
  
        if (isWhitelisted) {
          // If email is whitelisted, respond accordingly
          res.status(200).json({ youAPIkey: findAppName.apiKey });
        } else {
          res
            .status(403)
            .json({ error: "User is not whitelisted for this app." });
        }
      } else {
        res.status(500).json({ error: "No App found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
   */