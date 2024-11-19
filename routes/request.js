const express = require('express');
const {userAuth} = require('../middlewares/auth');
const requestRouter = express.Router();
const {connectionReqModel} = require('../models/connectionReq');
const User = require("../models/user")

requestRouter.post('/request/send/:status/:toUserId',userAuth, async(req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;

        // first validate toUserId -> is user registered or not
        const isToUserValid = await User.findOne({_id : toUserId});
        if(!isToUserValid) {
            return res.status(400).json({
                message : "User is invalid"
            })
        }

        // check if user is not making connectionReq to itself
        if(fromUserId == toUserId) {
            return res.status(400).json({
                message : "You cannot send request to yourself"
            })
        }

        const status = req.params.status;

        const allowedStatuses = ['interested', 'ignore'];
        if(!allowedStatuses.includes(status)) {
            return res.status(400).json({message : `Invalid status : ${status}`});
        }

        // if there is any existing connectioReq
        const isExistingConnectionReq = await connectionReqModel.findOne({
            $or : [
                {fromUserId, toUserId},   
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })

        if(isExistingConnectionReq) {
            return res.status(400).json({message : `Connection request sent already`})
        }

        const connectionReq = new connectionReqModel({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionReq.save();
        res.send({
            message: "Request send successfully",
            data
        })
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        // validate status and request Id
        const status = req.params.status;
        const requestId = req.params.requestId;
        
        const allowedStatuses = ["accepted", "rejected"];
        if(!allowedStatuses.includes(status)) {
            return res.status(400).send("Invalid status");
        }
        const connectionRequest = await connectionReqModel.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        }); //strict checks
        
        if(!connectionRequest) {
            return res.status(400).json({
                message : "Connection request not found"
            })
        }
        
        connectionRequest.status = status;
        const updatedData = await connectionRequest.save();
        
        res.json({
            message : "Connection request " + status,
            updatedData
        })

        console.log("code end");
        
        // touserId => loggedInUser
        // only harkirat can accept or reject the request
        // can only be accept or reject if status is interested


    } catch (error) {
        res.status(400).send('Something went wrong' + error.message)
    }
})

module.exports = {requestRouter};