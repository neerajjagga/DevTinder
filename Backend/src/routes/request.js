const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter = express.Router();
const { connectionReqModel } = require('../models/connectionReq');
const User = require("../models/user");

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;

        // first validate toUserId -> is user registered or not
        const isToUserValid = await User.findOne({ _id: toUserId });
        if (!isToUserValid) {
            return res.status(400).json({
                success: false,
                message: "User is invalid"
            })
        }

        // check if user is not making connectionReq to itself
        if (fromUserId == toUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send request to yourself"
            })
        }

        const status = req.params.status;

        const allowedStatuses = ['interested', 'ignore'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            })
        }

        // if there is any existing connectioReq
        const isExistingConnectionReq = await connectionReqModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (isExistingConnectionReq) {
            return res.status(400).json({
                success: false,
                message: isExistingConnectionReq.status === 'interested' ? 'Connection request already sent' : "You have already ignore this person",
            })
        }

        const connectionReq = new connectionReqModel({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionReq.save();
        res.status(200).json({
            success: true,
            message: data.status === 'interested' ? 'Connection request sent successfully' : "You have successfully ignore this person",
        })
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const status = req.params.status;
        const requestId = req.params.requestId;

        const allowedStatuses = ["accepted", "rejected"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            })
        }
        const connectionRequest = await connectionReqModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        }); 

        if (!connectionRequest) {
            return res.status(400).json({
                success: false,
                message: "Connection request not found"
            })
        }

        connectionRequest.status = status;
        await connectionRequest.save();

        res.status(200).json({
            success: true,
            message: status === 'accept' ? "Request rejected successfully" : "Request rejected successfully",
        })

    } catch (error) {
        res.status(400).send('Something went wrong' + error.message)
    }
})

requestRouter.patch('/request/read/:requestId', userAuth, async(req, res) => {
    try {
        const {requestId} = req.params;

        // find the request

        const updatedReq = await connectionReqModel.findByIdAndUpdate(requestId, {
            isRead : true,
        }, {new : true})

        if(!updatedReq) {
            return res.status(400).json({
                success : false,
                message : "Connection request not found",
            })
        }

        res.status(200).json({
            success : true,
            message : "success",
        })

    } catch (error) {
        res.status(400).send('Something went wrong' + error.message)
    }
})
 
module.exports = { requestRouter };