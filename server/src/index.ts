import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Router from './routes/route';
import { mongodbUrl, PORT } from './config';

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'https://jatin-raghav.vercel.app/', // Allow only this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors());
app.use(express.json());
app.use(Router);

mongoose.connect(mongodbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
