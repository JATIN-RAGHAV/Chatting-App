import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    friends:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    inFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    outFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    chat:[
            {
                chatId:{type: mongoose.Schema.Types.ObjectId, ref: 'Chat'},
                with: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
            }]
});

const chatSchema = new mongoose.Schema({
    chat:[{
        sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        message: String
    }]
})

export const Chat = mongoose.model('Chat', chatSchema);
export const User = mongoose.model('User', userSchema);