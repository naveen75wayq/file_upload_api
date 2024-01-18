import App from '../model/app';
import fs from 'fs';
export const createApplication = async (req: any, res: any) => {
    
    const { applicationName, whitelistedDomains} = req.body;
    
    const apiKey = req.apiKey;
    
    
    if (!applicationName) {
        return res.json({ status: false, message: "Folder Name is Mandatory" });
    }
    const rootFolder = "bucket";
    const folderpath = `${rootFolder}/${applicationName}`;
    try {
        if (fs.existsSync(rootFolder)) {
            if (!fs.existsSync(folderpath)) {
                fs.mkdirSync(folderpath);
                const appData = await App.create({
                    applicationName,
                    apiKey,
                    whitelistedDomains
                })
                console.log(appData)
                return res.json({ status: true, success: "Directory created" });
            }
        } else {
            fs.mkdirSync(rootFolder);
            if (!fs.existsSync(folderpath)) {
                fs.mkdirSync(folderpath);
                const appData = await App.create({
                    applicationName,
                    apiKey,
                    whitelistedDomains
                })
                console.log(appData)
                return res.json({ status: true, success: "Directory/Folder created" });
            }
        }
        const appData = await App.create({
            applicationName,
            apiKey,
            whitelistedDomains
        })
        console.log(appData)
        return res.json({ status: true, success: "Directory/Folder Already Exist" });
    } catch (error) {
        console.log(error);
    }
}

  