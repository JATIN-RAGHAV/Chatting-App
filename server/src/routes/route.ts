import express  from "express";
import loginRouter from './authRoutes/login'
import signinRouter from './authRoutes/signin'
import userRoutes from './userRoutes/user'
const Router = express.Router()

Router.use('/login', loginRouter);
Router.use('/signin', signinRouter)
Router.use('/user', userRoutes)
Router.use((req, res) => {
    res.status(404).json({message: 'Page not found, here'})
})

export default Router;