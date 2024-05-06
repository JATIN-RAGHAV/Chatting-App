import express  from "express";
import { User, Chat } from "../../db/schemas";

const Router = express.Router()

Router.post('/send', async (req, res) => {
    // Expected body type {receiver: receiverUsername, message: message}
    const receiver: String = req.body.receiver;
    const message: String = req.body.message;
    const user = await User.findOne({username: req.body.serverData.user.username});
    if(user){
        const receiverObject = await User.findOne({username: receiver})
        if(receiverObject){
            if(user.friends.some(id => id.equals(receiverObject._id))){
                if(!user.chat.some(chats => chats.with?.equals(receiverObject._id))){
                    const newChatObjectContent = new Chat({chat:[{sender:user._id, message}]})
                    await newChatObjectContent.save()
                    user.chat.push({chatId: newChatObjectContent._id, with:receiverObject.username})
                    receiverObject.chat.push({chatId: newChatObjectContent._id, with: user.username})
                }else{
                    const chatId = user.chat.find(chat => chat.with?.equals(receiverObject._id))
                    const chatObject = await Chat.findById(chatId)
                    if(chatObject){
                        chatObject.chat.push({sender: user._id, message})
                        await chatObject.save()
                        res.json({message: 'Message sent successfully'})
                    }
                }
            }else res.status(409).json({message: 'Your are not friends with the other person'})
        }else res.status(404).json({message: 'Receiver not found'})
    }else res.status(404).json({message: 'User not found'})
})

Router.get('/get', async (req, res) => {
    // Expects a body {with: username of other person}
    const otherPerson:String = req.body.with;
    const user = await User.findOne({username: req.body.serverData.user.username});
    if(user){
        const other = await User.findOne({username: otherPerson});
        if(other){
            const chatId = user.chat.find(chat => chat.with?.equals(other._id))
            if(chatId){
                const chatObject = await Chat.findById(chatId)
                if(chatObject){
                    res.json({chat: chatObject.chat})
                }else res.status(404).json({message: 'Chat not found'})
            }
        }
    }else res.status(404).json({message: 'User not found'})
})

export default Router