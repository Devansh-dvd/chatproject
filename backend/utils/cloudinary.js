import{v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET});

const uploadoncloudinary = async(profilepicpath) =>{
    try{
        if(!profilepicpath){
            return null;
        }
        const response = await cloudinary.uploader.upload(profilepicpath,{
            resource_type: 'auto',
            folder: 'chatsin',
        })
        fs.unlinkSync(profilepicpath);
        return response;
    } catch (error) {
        console.log("Error uploading to Cloudinary:", error);
        return null;
    }
}

export{uploadoncloudinary};
