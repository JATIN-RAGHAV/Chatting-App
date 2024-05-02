import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    friends:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    inFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    outFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export const User = mongoose.model('User', userSchema);