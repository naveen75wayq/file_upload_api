import multer from 'multer';
import fs from 'fs'
const storage = multer.diskStorage({
    destination: function (req:any, file, cb) {
        const applicationName = req.query.applicationName;
        const path = `bucket/${applicationName}/`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
      },
      filename: function (req:any, file, cb) {
        cb(null, file.originalname );
      }
});
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 10000000 
      },
})
export default upload;