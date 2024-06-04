"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./authRoutes/login"));
const signin_1 = __importDefault(require("./authRoutes/signin"));
const user_1 = __importDefault(require("./userRoutes/user"));
const Router = express_1.default.Router();
Router.use('/login', login_1.default);
Router.use('/signin', signin_1.default);
Router.use('/user', user_1.default);
exports.default = Router;
