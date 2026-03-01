import{v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret});

const uploadoncloudinary = async(profilepicpath) =>{
    try{
        if(!profilepicpath){
            return null;
        }
        const response = await cloudinary.uploader.upload(profilepicpath,{
            resource_type: 'auto',
            folder: 'chatsin/userpic',
        })
        fs.unlinkSync(profilepicpath);
        return response;
    } catch (error) {
        console.log("Error uploading to Cloudinary:", error);
        return null;
    }
}

export{uploadoncloudinary};
