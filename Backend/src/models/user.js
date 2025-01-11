const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true,
        trim : true,
    },
    lastName : {
        type: String,
        trim : true,
    },
    emailId : {
        type : String,
        required : true,
        // index : true,
        unique : true, // The unique option automatically creates an index to enforce the uniqueness constraint, so you don’t need to explicitly define index: true. This is why index: true is commented out in your schema.
        lowercase : true,
        trim : true, // to avoid spacing
        // match: /^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type : String,
        required : true,
        trim : true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter strong password " + value);
            }
        }
    },
    age : {
        type : Number,
        min : 18
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female', 'others']
    },
    photoUrl : {
        type : String,
        default : "https://imgs.search.brave.com/ypfvUlK9VRUz0WkapXl99G43egJxl1ek6iO1m90xmmc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzQyLzM2LzEx/LzM2MF9GXzU0MjM2/MTE4NV9WRlJKV3BS/MkZINU9pQUVWdmVX/TzdvWm5mU2NjWmZE/My5qcGc",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error('Invalid photo url ' + value);
            }
        }
    },
    about : {
        type : String,
        default : "This is a default about of the user"
    },
    skills: {
        type: [{ type: String, trim: true }],
        validate: {
            validator: function (v) {
                return v.length >= 1 && v.length <= 10; 
            },
            message: props => `The array should contain between 1 and 10 skills. Currently, it has ${props.value.length} skills.`
        }
    }
}, {
    timestamps : true
})

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    return isPasswordValid;
}

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = jwt.sign({_id : user._id}, jwt_secret_key, {expiresIn : '1d'})
    return token;
}

userSchema.set('toJSON', {
    transform : (doc, ret) => {
        delete ret.password
        return ret
    }
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
