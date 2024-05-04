"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../../db/schemas");
const authenticate_1 = __importDefault(require("../authRoutes/authenticate"));
const Router = express_1.default.Router();
Router.get('/users', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield schemas_1.User.find({});
    if (users) {
        const usersToSend = users.map((user) => { return { username: user.username }; });
        const filteredUsers = usersToSend.filter(user => user.username !== req.body.serverData.user.username);
        res.json(filteredUsers);
    }
    else {
        res.status(404).json({ message: 'Could not find users' });
    }
}));
Router.get('/friends', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schemas_1.User.findOne({ username: req.body.serverData.user.username });
    if (user) {
        const friendsFull = yield schemas_1.User.find({ _id: { $in: user.friends } });
        if (friendsFull) {
            const friends = friendsFull.map(user => user.username);
            res.json({ friends });
        }
        else {
            res.json({ message: 'fuck you do not have any friends it seems' });
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
}));
Router.post('/send-friend-request', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Expect body.username = username
    const { username } = req.body;
    const receiverUser = yield schemas_1.User.findOne({ username });
    if (receiverUser) {
        let senderUser = yield schemas_1.User.findOne({ username: req.body.serverData.user.username });
        if (senderUser) {
            if (!senderUser.inFriendRequests.includes(receiverUser._id) && !senderUser.outFriendRequests.includes(receiverUser._id) && !senderUser.friends.includes(receiverUser._id) && !receiverUser.inFriendRequests.includes(senderUser._id) && !receiverUser.outFriendRequests.includes(senderUser._id) && !receiverUser.friends.includes(senderUser._id)) {
                senderUser.outFriendRequests.push(receiverUser._id);
                receiverUser.inFriendRequests.push(senderUser._id);
                yield senderUser.save();
                yield receiverUser.save();
                res.json({ message: 'Friend Request sent successfully' });
            }
            else {
                res.status(409).json({ message: 'Already in you list' });
            }
        }
    }
    else {
        res.status(404).json({ message: "The other user not found" });
    }
}));
Router.get('/received-friend-requests', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schemas_1.User.findOne({ username: req.body.serverData.user.username });
    if (user) {
        const receivedFriendRequests = yield schemas_1.User.find({ _id: { $in: user.inFriendRequests } });
        const receivedFriendRequestsUsername = receivedFriendRequests.map(user => user.username);
        res.json({ receivedFriendRequestsUsername });
    }
    else {
        res.status(404).json({ message: 'User not Found' });
    }
}));
Router.get('/sent-friend-requests', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield schemas_1.User.findOne({ username: req.body.serverData.user.username });
    if (user) {
        const sentFriendRequests = yield schemas_1.User.find({ _id: { $in: user.outFriendRequests } });
        const sentFriendRequestsUsername = sentFriendRequests.map(user => user.username);
        res.json({ sentFriendRequestsUsername });
    }
    else {
        res.status(404).json({ message: 'User not Found' });
    }
}));
Router.post('/accept-friend-request', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Expects body.username = username
    const user = yield schemas_1.User.findOne({ username: req.body.serverData.user.username });
    if (user) {
        const { username } = req.body;
        const receiverUser = yield schemas_1.User.findOne({ username });
        if (receiverUser) {
            if ((user.inFriendRequests.includes(receiverUser._id)) && (receiverUser.outFriendRequests.includes(user._id)) && !user.friends.includes(receiverUser._id) && !receiverUser.friends.includes(user._id)) {
                user.inFriendRequests = user.inFriendRequests.filter(id => !id.equals(receiverUser._id));
                receiverUser.outFriendRequests = receiverUser.outFriendRequests.filter(id => !id.equals(user._id));
                user.friends.push(receiverUser._id);
                receiverUser.friends.push(user._id);
                yield user.save();
                yield receiverUser.save();
                res.json({ message: `Friend Request to ${receiverUser.username} Accepted successfully` });
            }
            else {
                res.status(409).json({ message: 'Could not accept friend request' });
            }
        }
        else {
            res.status(404).json({ message: 'Receiver user not found' });
        }
    }
}));
Router.post('/remove-friend', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Expects a body with username: username
    const userUsername = req.body.serverData.user.username;
    const friendUsername = req.body.username;
    const user = yield schemas_1.User.findOne({ username: userUsername });
    if (user) {
        const friend = yield schemas_1.User.findOne({ username: friendUsername });
        if (friend) {
            user.friends = user.friends.filter(id => !id.equals(friend._id));
            friend.friends = friend.friends.filter(id => !id.equals(user._id));
            yield user.save();
            yield friend.save();
            res.json({ message: 'Friend removed successfully' });
        }
        else {
            res.status(404).json({ message: 'Friend not found' });
        }
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}));
exports.default = Router;
