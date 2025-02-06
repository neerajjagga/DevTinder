import Connection from '../models/connection.model.js'
import User from "../models/user.js";

export const sendConnection = async (req, res) => {
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
        const isExistingConnectionReq = await Connection .findOne({
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

        const connectionReq = new Connection ({
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
}

export const reviewConnection = async (req, res) => {
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
        const connectionRequest = await Connection .findOne({
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
}

//TODO: remaining
// requestRouter.patch('/request/read/:requestId', userAuth, async (req, res) => {
//     try {
//         const { requestId } = req.params;

//         // find the request

//         const updatedReq = await Connection .findByIdAndUpdate(requestId, {
//             isRead: true,
//         }, { new: true })

//         if (!updatedReq) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Connection request not found",
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: "success",
//         })

//     } catch (error) {
//         res.status(400).send('Something went wrong' + error.message)
//     }
// })

module.exports = { requestRouter };