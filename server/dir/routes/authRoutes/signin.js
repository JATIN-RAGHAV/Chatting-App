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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const Router = express_1.default.Router();
Router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield schemas_1.User.findOne({ username });
    if (user) {
        res.status(409).json({ message: 'Username Already Exists' });
    }
    else {
        const newUser = new schemas_1.User({ username, password });
        yield newUser.save()
            .then(() => {
            const token = jsonwebtoken_1.default.sign({ username }, config_1.SECRETKEY);
            res.json({ message: 'User Created Succesfully', token });
        })
            .catch((err) => {
            res.status(500).json({ message: 'Could not save user' });
        });
    }
}));
exports.default = Router;
