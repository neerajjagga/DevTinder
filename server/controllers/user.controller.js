import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            user,
        })
    } catch (error) {
        console.log("Error while getting profile" + error.message);
        res.status(500).json({ message: error.message })
    }
}