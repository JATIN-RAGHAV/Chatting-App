import express  from "express";
import loginRouter from './authRoutes/login'
import signinRouter from './authRoutes/signin'
import userRoutes from './userRoutes/user'
const Router = express.Router()

Router.use('/login', loginRouter);
Router.use('/signin', signinRouter)
Router.use('/user', userRoutes)


export default Router;