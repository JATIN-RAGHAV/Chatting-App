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
        const usersToSend = users.map((user) => { return { username: user.username, password: user.password }; });
        const filteredUsers = usersToSend.filter(user => user.username !== req.body.user.username);
        res.json(filteredUsers);
    }
    else {
        res.status(404).json({ message: 'Could not find users' });
    }
}));
exports.default = Router;
