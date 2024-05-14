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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const schemas_1 = require("../../db/schemas");
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers["authorization"];
        if (!authHeader || typeof authHeader !== "string") {
            return res.status(409).json({ message: "Token not sent" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const user = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY);
            if (typeof user === "object") {
                const userServer = yield schemas_1.User.findOne({ username: user.username });
                if (userServer) {
                    console.log(user);
                    req.body.serverData = { user };
                    return next();
                }
            }
            return res.status(401).json({ message: "Could not authenticate" });
        }
        catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ message: "Could not verify" });
        }
    });
}
exports.default = authentication;
