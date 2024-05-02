import express  from "express";
import { User } from "../../db/schemas";
import jwt from "jsonwebtoken";
import { SECRETKEY } from "./config";

const Router = express.Router()

Router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, password})
    if(user){
        const token = jwt.sign({username}, SECRETKEY)
        res.json({message:'Logged in successfully', token})
    }else{
        res.status(409).json({message: 'User Does not exist'})
    }
})

export default Router