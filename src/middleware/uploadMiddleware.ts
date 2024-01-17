import multer from 'multer';
import path from 'path';
import fs from 'fs'
const storage = multer.diskStorage({
  
    destination: function (req:any, file, cb) {
        const folderName = req.query.folderName;
        console.log(req.query);
        const path = `bucket/${folderName}/`;
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
      },
      filename: function (req:any, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
});
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 10000000 
      },
})

export default upload;