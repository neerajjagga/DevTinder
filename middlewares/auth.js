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
            throw new Error("Token is not valid");
        }
        // and validate the token 
        
        const decodedObj = jwt.verify(token, jwt_secret_key);
        const {_id} = decodedObj;
        
        // and find the user

        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send(`Error : ${error}`)
    }    
}


module.exports = {userAuth};