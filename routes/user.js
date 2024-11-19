const express = require('express');
const { userAuth } = require('../middlewares/auth');
const {connectionReqModel} = require('../models/connectionReq');
const userRouter = express.Router();


userRouter.get('/user/requests/received', userAuth, async(req, res) => {
    try {
        const loggesInUser = req.user;

        const allPendingRequests = await connectionReqModel.find({
            toUserId : loggesInUser._id,
            status : "interested",
        }).populate("fromUserId", "firstName lastName about"); // [], '', 

        if(allPendingRequests.length === 0) {
            return res.json({
                message : "No pending requests"
            })
        }

        res.json({
            message : "Pending requests",
            requests : allPendingRequests
        })
            
    } catch (error) {
        res.status(400).send("Error " + error.message);
    }
})

userRouter.get('/user/connections', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await connectionReqModel.find({
            $or : [
                {toUserId : loggedInUser._id},
                {fromUserId : loggedInUser._id}
            ],
            status : "accepted"
        })
        .populate('fromUserId', 'firstName lastName')
        .populate('toUserId', 'firstName lastName')


        const data = connections.map((data) => {
            if(data.fromUserId._id.toString() == loggedInUser._id.toString) {
                return data.toUserId;
            }
            else {
                return data.fromUserId;
            }
        });

        res.json({
            message : `Number of connections : ${connections.length}`,
            data 
        })

    } catch (error) {
        res.status(400).send("Error " + error.message)
    }
})

module.exports = {userRouter};