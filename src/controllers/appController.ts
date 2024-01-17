
import fs from 'fs';
export const createApplication = async (req: any, res: any) => {
    const folderName = req.body.folderName;
    if (!folderName) {
        return res.json({ status: false, message: "Folder Name is Mandatory" });
    }
    const rootFolder = "bucket";
    const folderpath = `${rootFolder}/${folderName}`;
    try {
        if (fs.existsSync(rootFolder)) {
            if (!fs.existsSync(folderpath)) {
                fs.mkdirSync(folderpath);
                return res.json({ status: true, success: "Directory created" });
            }
        } else {
            fs.mkdirSync(rootFolder);
            if (!fs.existsSync(folderpath)) {
                fs.mkdirSync(folderpath);
                return res.json({ status: true, success: "Directory/Folder created" });
            }
        }
        return res.json({ status: true, success: "Directory/Folder Already Exist" });
    } catch (error) {
        console.log(error);
    }
}
