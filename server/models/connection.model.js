import mongoose from "mongoose";

const connectionSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

connectionSchema.set('toJSON', {
    versionKey : false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});


const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;