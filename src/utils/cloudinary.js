import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



// uplode file to the cloudinary

let uplodeFileClodinary = async (localFilePath) => {

  try {
    if (!localFilePath) {
      return null
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // file has been uploded sucessfully to the cloudinary
    console.log("file is uploded sucessfully on cloudinary", response.secure_url);
    fs.unlinkSync(localFilePath);
    return response


  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(localFilePath)
    return null;

  }

}

const deleteFileFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary deletion result:', result);
    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return null;
  }
};


// ✅ Delete file from Cloudinary using public_id

export { uplodeFileClodinary, deleteFileFromCloudinary }