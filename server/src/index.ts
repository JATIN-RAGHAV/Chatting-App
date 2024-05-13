import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import Router from './routes/route'
import { mongodbUrl, PORT } from './config';

const app = express();

// Configure CORS to allow requests from any origin
const corsOptions = {
    origin: '*', // Allow requests from any origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use((req, res, next) => {
    console.log(req.body)
    console.log(req.headers)
    next();
})
app.use(cors(corsOptions));
app.use(express.json());
app.use(Router)

mongoose.connect(mongodbUrl)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));