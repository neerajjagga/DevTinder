import Connection from '../models/connection.model.js';
import User from '../models/user.model.js';

export const getFeed = async (req, res) => {
    try {
        const loggedInUser = req.user;
        let limit = parseInt(req.query.limit) || 10;
        console.log(limit);
        limit = limit > 50 ? 50 : limit;

        const USER_SAFE_DATA = "name profileImageUrl about skills"
        const allConnectionRequest = await Connection.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select('fromUserId toUserId')

        const hideUsersFromFeed = new Set();

        allConnectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
            .select(USER_SAFE_DATA)
            .sort({ createdAt: -1 })
            .limit(limit)

        const countOfDocuments = users.length;

        console.log("Users from feed----------------");
        console.log(users);

        res.status(200).json({
            success: false,
            message: "success",
            users,
            count: countOfDocuments,
        })

    } catch (error) {
        console.log("Error coming while getting feed" + error.message);
        res.status(500).json({ message: error.message });
    }
}
