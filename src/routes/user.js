const express = require('express');
const { userAuth } = require('../middlewares/auth');
const {connectionReqModel} = require('../models/connectionReq');
const userRouter = express.Router();
const User = require('../models/user');
const status = require('statuses');
const mongoose = require('mongoose');


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
            if(data.fromUserId._id.toString() == loggedInUser._id.toString()) {
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

userRouter.get('/feed', userAuth, async(req, res) => {
    try {
        
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const USER_SAFE_DATA = "firstName lastName photoUrl skills age gender"
        const allConnectionRequest = await connectionReqModel.find({
            $or : [
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        }).select('fromUserId toUserId')

        const hideUsersFromFeed = new Set(); // unique id's 
        allConnectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })        

        const users = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit)
        
        const countOfDocuments = users.length;
        res.json({
            count : countOfDocuments,
            data : users
        })

    } catch (error) {
        res.status(400).json({
            message : "Error : " + error.message
        })
    }
})


module.exports = {userRouter};