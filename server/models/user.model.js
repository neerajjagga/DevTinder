import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name should be minimum of length 3"],
        maxLength : [25, "Name should be maximum 25 characters"],
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minLength: [6, "Password should be minimum of length 6"],
        required: [true, "Password is required"],
        trim: true,
    },
    profileImageUrl : {
        type : String,
        default: '',
    },
    about : {
        type : String,
        default : '',
    },
    skills : [{
        type : String,
        required : true,
        validate: {
            validator: function (v) {
                return v.length >= 1 && v.length <= 10; 
            },
            message: props => `The array should contain between 1 and 10 skills. Currently, it has ${props.value.length} skills.`
        }
    }]
}, {
    timestamps: true
});

userSchema.methods.hashPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

userSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified('password')) {
        return;
    }
    user.password = await bcrypt.hash(user.password, 10);
});

userSchema.set('toJSON', {
    versionKey : false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
