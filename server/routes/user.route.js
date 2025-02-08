import express from 'express';
import {
    getUserProfile,
} from '../controllers/user.controller.js';
import { checkAuth } from '../middlewares/user.middleware.js';

const userRouter = express.Router();

userRouter.get('/profile', checkAuth, getUserProfile);


/**
 * 
 * feedRouter.get('/user/requests/received', checkAuth , async(req, res) => {
    try {
        const loggesInUser = req.user;

        const allPendingRequests = await Connection.find({
            toUserId : loggesInUser._id,
            status : "interested",
        }).populate("fromUserId", "firstName lastName about photoUrl"); 

        if(allPendingRequests.length === 0) {
            return res.status(200).json({
                success : true,
                message : "No pending requests",
                requests : []
            })
        }

        res.status(200).json({
            success : true,
            message : "success",
            requests : allPendingRequests
        })
            
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
        })
    }
})

feedRouter.get('/user/connections', checkAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await Connection.find({
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
 */

export default userRouter;
