const express = require('express');
const {userAuth} = require('../middlewares/auth');
const {validateEditProfileData} = require('../utils/validation');
const profileRouter = express.Router();
const {validatePassword} = require('../utils/validation');
const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');

profileRouter.get('/profile/view', userAuth, async(req, res) => {
    try {
     const user = req.user;
     res.send(user);
    } catch (error) {
     res.status(400).send("Something went wrong")
    }
})

profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
    if(!validateEditProfileData(req)) {
        return res.status(400).send("Enter valid data to edit");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your profile was updated successfully`);
})

profileRouter.patch('/update/password',userAuth, async(req, res) => {
    try {
        const user = req.user;
        if(validatePassword(req, user)){
            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hashedNewPassword; 
            await user.save();
            res.send("Password updated successfully, Login again");
        }
    } catch (error) {
        res.status(500).send("Error while updating password -> Try again later");
    }
})

// get indexes
// profileRouter.get('/indexes/:collectionName', async (req, res) => {
//     const collectionName = req.params.collectionName;

//     try {
//         // Using native MongoDB connection from Mongoose
//         const collection = await mongoose.connection.db.collection(collectionName);
//         const indexes = await collection.listIndexes().toArray(); // Fetch all indexes
//         res.json(indexes);
//     } catch (error) {
//         console.error(`Error fetching indexes for ${collectionName}:`, error);
//         res.status(500).send(`Error fetching indexes for ${collectionName}`);
//     }
// });


module.exports = {profileRouter};