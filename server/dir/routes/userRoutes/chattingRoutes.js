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
Router.post("/send", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Expected body type {receiver: receiverUsername, message: message}
    const receiver = req.body.receiver;
    const message = req.body.message;
    const user = yield schemas_1.User.findOne({
        username: req.body.serverData.user.username,
    });
    if (user) {
        const receiverObject = yield schemas_1.User.findOne({ username: receiver });
        if (receiverObject) {
            if (user.friends.some((id) => id.equals(receiverObject._id))) {
                if (!user.chat.some((chats) => { var _a; return (_a = chats.with) === null || _a === void 0 ? void 0 : _a.equals(receiverObject._id); })) {
                    const newChatObjectContent = new schemas_1.Chat({
                        chat: [{ sender: user._id, message }],
                    });
                    yield newChatObjectContent.save();
                    user.chat.push({
                        chatId: newChatObjectContent._id,
                        with: receiverObject._id,
                    });
                    receiverObject.chat.push({
                        chatId: newChatObjectContent._id,
                        with: user._id,
                    });
                    yield user.save();
                    yield receiverObject.save();
                    res.json({ message: 'Message sent successfully' });
                }
                else {
                    const chatId = (_a = user.chat.find((chat) => { var _a; return (_a = chat.with) === null || _a === void 0 ? void 0 : _a.equals(receiverObject._id); })) === null || _a === void 0 ? void 0 : _a.chatId;
                    const chatObject = yield schemas_1.Chat.findById(chatId);
                    if (chatObject) {
                        chatObject.chat.push({ sender: user._id, message });
                        yield chatObject.save();
                        res.json({ message: "Message sent successfully" });
                    }
                    else
                        res.status(409).json({ message: 'Could not send message' });
                }
            }
            else
                res
                    .status(409)
                    .json({ message: "Your are not friends with the other person" });
        }
        else
            res.status(404).json({ message: "Receiver not found" });
    }
    else
        res.status(404).json({ message: "User not found" });
}));
Router.get("/get", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Expects a body {with: username of other person}
    const otherPerson = req.body.with;
    const user = yield schemas_1.User.findOne({
        username: req.body.serverData.user.username,
    });
    if (user) {
        const other = yield schemas_1.User.findOne({ username: otherPerson });
        if (other) {
            const chatId = (_b = user.chat.find((chat) => { var _a; return (_a = chat.with) === null || _a === void 0 ? void 0 : _a.equals(other._id); })) === null || _b === void 0 ? void 0 : _b.chatId;
            if (chatId) {
                const chatObject = yield schemas_1.Chat.findById(chatId);
                if (chatObject) {
                    const chatToSend = chatObject.chat.map(chat => {
                        var _a;
                        return {
                            sender: ((_a = chat.sender) === null || _a === void 0 ? void 0 : _a.equals(user._id)) ? user.username : other.username,
                            message: chat.message
                        };
                    });
                    res.json({ chat: chatToSend });
                }
                else
                    res.status(404).json({ message: "Chat not found" });
            }
            else
                res.status(404).json({ message: 'Chat not found, here' });
        }
        else
            res.status(404).json({ message: 'Other user not found' });
    }
    else
        res.status(404).json({ message: "User not found" });
}));
exports.default = Router;
