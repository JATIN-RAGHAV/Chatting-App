"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    friends: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    inFriendRequests: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    outFriendRequests: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
});
exports.User = mongoose_1.default.model('User', userSchema);
