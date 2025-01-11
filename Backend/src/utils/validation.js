const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require("../models/user");

const validateSignupData = (req) => {

    const {firstName, emailId, password, skills} = req.body;

    if(!firstName) {
        throw new Error("Name is required");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Enter valid emailId");
    }
    else if(!validator.isStrongPassword(password)) {
        "Enter a strong passowrd";
    }
    if(skills.length < 1 || skills.length > 10) {
        throw ({statusCode : 400, message : "Skills must be 1 to 10"})
    }
}

const validateEditProfileData = (req) => {
    const validFields = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills"
    ]

    const isValidData = Object.keys(req.body).every(key => validFields.includes(key));
    return isValidData;
}

const validatePassword = async (req, user) => {
    const {oldPassword, newPassword, confirmNewPassword} = req.body;
        if(!oldPassword || !newPassword || !confirmNewPassword) {
            throw new Error('Enter valid data');
        }
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if(!isOldPasswordValid) {
            throw new Error('Password is incorrect'); 
        }
        if(oldPassword === newPassword) {
            throw new Error('Add a unique password');
        }
        // otherwise check if new passoword is strong or not
        if(!validator.isStrongPassword(newPassword)) {
            throw new Error('Enter strong password');
        }
        if(newPassword != confirmNewPassword) {
            throw new Error('Re-confirm your new password');
        }
}

const isvalidateToUserId = async (toUserId) => {
        const isToUserIdValid = await User.findOne({_id : toUserId});
        console.log(isToUserIdValid);
        if(isToUserIdValid) {
            return false;
        }
        return true;
}

const validateProfileImage = async(req, res, next) => {
    try {
        const maxSize = 5 * 1024 * 1024;
        const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    
        if(req.file.size > maxSize) {
            return res.status(400).json({
                success : false,
                message : "Image size should be less than 5MB"
            })
            // throw({statusCode : 400, message : "Image size should be less than 5MB"})
        }
        if (!validMimeTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success : false,
                message: "Image format should either jpg or png"
            })
            // throw({ statusCode: 400, message: "Image format should either jpg or png" });
        }
        next();
    } catch (error) {
        console.log("Error coming while validating profile data");
    }
}

module.exports = {
    validateSignupData,
    validateEditProfileData,
    validatePassword,
    isvalidateToUserId,
    validateProfileImage
};