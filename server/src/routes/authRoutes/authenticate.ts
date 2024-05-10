import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRETKEY } from "./config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../../db/schemas";

interface RequestUser extends Request{
    user: string|JwtPayload
}

export default async function authentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
        return res.status(409).json({ message: 'Token not sent' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, SECRETKEY);
        if (typeof user === 'object') {
            const userServer = await User.findOne({ username: user.username });
            if (userServer) {
                req.body.serverData = {user}
                return next();
            }
        }
        return res.status(401).json({ message: 'Could not authenticate' });
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Could not verify' });
    }
}
