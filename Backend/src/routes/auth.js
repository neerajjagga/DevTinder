const express = require('express');
const User = require('../models/user');
const {userAuth} = require('../middlewares/auth');
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

// signup
authRouter.post("/signup", async (req, res) => {
    try {
        // validation of data
        validateSignupData(req);

        // encrypt the password
        const { password, firstName, lastName, emailId, skills, age, gender, about } = req.body;

        //  here we have to do that the email id is not registered
        const checkEmailRegisteredAlready = await User.findOne({ emailId });

        // find return an empty array if no data found
        // findOne return null if not found

        if (checkEmailRegisteredAlready) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use. Please login"
            })
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        // creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hasedPassword,
            age,
            about,
            gender,
            skills
        })

        await user.save();

        console.log(user);

        res.status(200).json({
            success: true,
            message: "Account created successfully",
            user
        })

    } catch (error) {
        console.log(error);

        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
});

// login
authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            throw ({ statusCode: 400, message: "Email and password is required" });
        }

        const user = await User.findOne({ emailId });
        if (!user) {
            throw ({ statusCode: 400, message: "Invalid credentials" });
        }
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw ({ statusCode: 400, message: "Invalid credentials" });
        }
        // create a JWT token
        const token = await user.getJWT();

        //Add the token to cookie and sent the response back to the user
        res.cookie("token", token,
            {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: true,
                sameSite: "strict",
            });

        res.status(200).json({
            success: true,
            message: "Login successfull",
            user,
        })

    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: statusCode === 400 ? error.message : "Something went wrong"
        })
    }
})


authRouter.post('/logout', async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).send("Already logout");
    }
    
    res.clearCookie("token")
    res.status(200).json({
        success : true,
        message : "Logout successfull"
    })
})

authRouter.post('/checkAuth', userAuth, async(req, res) => {
    res.status(200).json({
        success : true,
        message : "success",
        user : req.user
    })
})

module.exports = { authRouter };