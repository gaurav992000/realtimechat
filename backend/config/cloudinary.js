import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()
console.log('Cloud name:', process.env.cloud_name);

const uploadOnCloudinary=async(filePath)=>{
      cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret 
    });
   
    
try {
    const uploadResult = await cloudinary.uploader
       .upload(filePath)
       fs.unlinkSync(filePath)
      
       
       return uploadResult.secure_url
    
    
    
} catch (error) {
    fs.unlinkSync(filePath)
     
    console.log(error);
    
    
}
}

export default uploadOnCloudinary