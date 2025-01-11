const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageOnCloudinary = async (filePath) => {
    try {

        if (!filePath || typeof filePath !== "string") {
            throw new Error("Invalid file path");
        }

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
            transformation: [
                {
                    width: 1000,
                    height: 1000,
                    crop: 'fill',
                    gravity: 'auto'
                }
            ]
        });
        return response;

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

const deleteImageOnCloudinary = async (secure_url) => {
    try {        
        if(!secure_url) {
            throw new Error("secure_url is required");
        }

        const publicId = extractPublicId(secure_url);
      
        if (!publicId) {
            throw new Error("Failed to extract publicId from the provided secure_url.");
        }

        const response = await cloudinary.uploader.destroy(publicId, { invalidate : true });
        
        if(response.result === 'not found') {
            throw new Error("Image not found");
        }

        return response;
    } catch (error) {
        console.error('Error deleting image :', error);
        throw error;
    }
}

module.exports = {
    uploadImageOnCloudinary,
}