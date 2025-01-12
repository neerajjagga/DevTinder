
const express = require('express');
const cloudinaryRouter = express();
const UserModel = require('../models/user');
const { userAuth } = require("../middlewares/auth");
const multer = require('multer');
const { uploadImageOnCloudinary } = require("../utils/cloudinary");
const {validateProfileImage} = require('../utils/validation');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage })

cloudinaryRouter.post('/upload/img', userAuth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a profile picture"
            });
        }

        validateProfileImage(req.file);

        const loggedInUser = req.user;

        const response = await uploadImageOnCloudinary(req.file.path);

        const updatedUser = await UserModel.findByIdAndUpdate(loggedInUser._id, {
            photoUrl: response.secure_url,
        }, { new: true });

        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        if (req.file?.path) {
            fs.unlinkSync(req.file.path); 
        }

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: statusCode !== 500 ? error.message : "Failed to upload image, try again later",
            error: error.message,
        });
    }
});

module.exports = {
    cloudinaryRouter
}