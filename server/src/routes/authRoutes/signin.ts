import express  from "express";
import { User } from "../../db/schemas";
import jwt from "jsonwebtoken";
import { SECRETKEY } from "./config";

const Router = express.Router()

Router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    if(user){
        res.status(409).json({message:'Username Already Exists'})
    }else{
        const newUser = new User({username, password})
        await newUser.save()
            .then(() => {
                const token = jwt.sign({username}, SECRETKEY)
                res.json({message: 'User Created Succesfully', token})
            })
            .catch((err) => {
                res.status(500).json({message: 'Could not save user'})
            })
    }
})

export default Router