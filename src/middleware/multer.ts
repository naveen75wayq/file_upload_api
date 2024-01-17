import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now() 
        + path.extname(file.originalname));
    },
    destination(req, file, callback) {
        callback(null, './uploads')        
    },
});
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 10000000 // 1000000 Bytes = 1 MB
      },
})

export default upload;