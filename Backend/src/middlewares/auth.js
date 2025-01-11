const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET;

const userAuth = async(req, res, next) => {
    try {
        // read the token from the request cookies
        const {token} = req.cookies;
        if(!token) {
            throw({ statusCode : 400, message : "Token is not valid"});
        }
        // and validate the token 
        
        const decodedObj = jwt.verify(token, jwt_secret_key);
        const {_id} = decodedObj;
        
        // and find the user

        const user = await User.findById(_id);
        if(!user) {
            throw({ statusCode : 400, message : "User not valid"});
        }
        req.user = user;
        next();
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            message : false,
            message : statusCode === 400 ? error.message : "Something went wrong"
        })
    }    
}


module.exports = {userAuth};