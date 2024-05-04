import express  from "express";
import { User } from "../../db/schemas";
import authentication  from "../authRoutes/authenticate";

const Router = express.Router()

Router.get('/users',authentication, async (req, res) => {
    const users = await User.find({})
    if(users){
        const usersToSend = users.map((user) => {return{username:user.username} })
        const filteredUsers = usersToSend.filter(user =>  user.username !== req.body.serverData.user.username)
        res.json(filteredUsers)
    }else{
        res.status(404).json({message: 'Could not find users'})
    }
})

Router.get('/friends',authentication, async(req, res) => {
    const user = await User.findOne({username: req.body.serverData.user.username})
    if(user){
        const friendsFull = await User.find({_id: {$in: user.friends}})
        if(friendsFull){
            const friends = friendsFull.map(user => user.username)
            res.json({friends});
        }else{ res.json({message: 'fuck you do not have any friends it seems'})}
    }else{
        res.status(404).json({message: "User not found"})
    }
})

Router.post('/send-friend-request',authentication, async(req,res)=> {
    // Expect body.username = username
    const {username} = req.body;
    const receiverUser = await User.findOne({username});
    if(receiverUser){
        let senderUser = await User.findOne({username: req.body.serverData.user.username})
        if(senderUser){
            if(!senderUser.inFriendRequests.includes(receiverUser._id) && !senderUser.outFriendRequests.includes(receiverUser._id) && !senderUser.friends.includes(receiverUser._id) && !receiverUser.inFriendRequests.includes(senderUser._id) && !receiverUser.outFriendRequests.includes(senderUser._id) && !receiverUser.friends.includes(senderUser._id)){
                senderUser.outFriendRequests.push(receiverUser._id);
                receiverUser.inFriendRequests.push(senderUser._id)
                await senderUser.save()
                await receiverUser.save()
                res.json({message:'Friend Request sent successfully'})
            }else{
                res.status(409).json({message: 'Already in you list'})
            }
        }
    }else{
        res.status(404).json({message:"The other user not found"})
    }
})

Router.get('/received-friend-requests', authentication, async(req, res) => {
    const user = await User.findOne({username: req.body.serverData.user.username});
    if(user){
        const receivedFriendRequests = await User.find({_id:{ $in: user.inFriendRequests }})
        const receivedFriendRequestsUsername = receivedFriendRequests.map(user => user.username)
        res.json({receivedFriendRequestsUsername})
    }else{
        res.status(404).json({message:'User not Found'})
    }
})

Router.get('/sent-friend-requests', authentication, async(req, res) => {
    const user = await User.findOne({username: req.body.serverData.user.username});
    if(user){
        const sentFriendRequests = await User.find({_id:{ $in: user.outFriendRequests }})
        const sentFriendRequestsUsername = sentFriendRequests.map( user => user.username)
        res.json({sentFriendRequestsUsername})
    }else{
        res.status(404).json({message:'User not Found'})
    }
})

Router.post('/accept-friend-request', authentication,async (req, res) => {
    // Expects body.username = username
    const user = await User.findOne({username: req.body.serverData.user.username})
    if(user){
        const {username} = req.body;
        const receiverUser = await User.findOne({username});
        if(receiverUser){
            if((user.inFriendRequests.includes(receiverUser._id)) && (receiverUser.outFriendRequests.includes(user._id)) && !user.friends.includes(receiverUser._id) && !receiverUser.friends.includes(user._id)){
                user.inFriendRequests = user.inFriendRequests.filter(id => !id.equals(receiverUser._id) );
                receiverUser.outFriendRequests = receiverUser.outFriendRequests.filter(id => !id.equals(user._id) );
                user.friends.push(receiverUser._id);
                receiverUser.friends.push(user._id);
                await user.save()
                await receiverUser.save();
                res.json({message: `Friend Request to ${receiverUser.username} Accepted successfully`})
            }
            else{
                res.status(409).json({message: 'Could not accept friend request'})
            }
        }else{
            res.status(404).json({message:'Receiver user not found'})
        }
    }
})

Router.post('/remove-friend', authentication, async(req, res) => {
    // Expects a body with username: username
    const userUsername = req.body.serverData.user.username;
    const friendUsername = req.body.username;
    const user = await User.findOne({username: userUsername})
    if(user){
        const friend = await User.findOne({username: friendUsername})
        if(friend){
            user.friends = user.friends.filter( id => !id.equals(friend._id) )
            friend.friends = friend.friends.filter( id => !id.equals(user._id))
            await user.save()
            await friend.save();
            res.json({message: 'Friend removed successfully'})
        }else{ res.status(404).json({message: 'Friend not found'}) }
    }else{ res.status(404).json({message: 'User not found'}) }
})

export default Router;
