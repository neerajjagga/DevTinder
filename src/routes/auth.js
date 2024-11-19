const express = require('express');
const User = require('../models/user');
const {validateSignupData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const authRouter = express.Router();

// signup
authRouter.post("/signup", async (req, res) => {
    try {
    // validation of data
    validateSignupData(req);
    
    // encrypt the password
    const {password, firstName, lastName, emailId, skills, age, gender} = req.body;

    //  here we have to do that the email id is not registered
    const checkEmailRegisteredAlready = await User.findOne({emailId : emailId});

    // find return an empty array if no data found
    // findOne return null if not found
    
    if(checkEmailRegisteredAlready) {
        return res.status(400).send(`${emailId} is already in use`);
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    // creating a new instance of the user model
    const user = new User({
        firstName, 
        lastName, 
        emailId, 
        password : hasedPassword, 
        age, 
        gender, 
        skills
    });
    await user.save();
    res.send("User created successfully");
     
    } catch (error) {
        res.status(400).send(`Error in making new user : ${error}`);
    }
});

// login
authRouter.post('/login', async (req, res) => {
    try {
        const {emailId, password} = req.body;

        if(!emailId || !password) {
            throw new Error("Enter emaildId and password");
        }
        
        //validateEmailID
        if(!validator.isEmail(emailId)) {
            throw new Error('Invalid emailId');
        }

        const user = await User.findOne({emailId : emailId});
        if(!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid) {
            // create a JWT token
            const token = await user.getJWT();

            //Add the token to cookie and sent the response back to the user
            res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)}); //{httpOnly : true} // 8 hour
            res.send("Login successfully");
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (error) {
        res.status(400).send(`Login failed ${error}`);
    }
})


authRouter.get('/logout', async (req, res) => {
    const {token} = req.cookies;
    if(!token) {
        return res.status(400).send("Already logout");
    }
    res
        .clearCookie("token")
        .send("Logout successfully");
})

module.exports = {authRouter};