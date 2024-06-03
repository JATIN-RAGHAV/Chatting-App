import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import Router from './routes/route'
import { mongodbUrl, PORT } from './config';

const app = express();
app.use(cors());
app.use(express.json());
app.use(Router)

mongoose.connect(mongodbUrl)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));