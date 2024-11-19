const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require("../models/user");

const validateSignupData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Enter valid emailId");
    }
    else if(!validator.isStrongPassword(password)) {
        "Enter a strong passowrd";
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

module.exports = {
    validateSignupData,
    validateEditProfileData,
    validatePassword,
    isvalidateToUserId
};