import express from 'express';
import mongoose from 'mongoose';
import Router from './routes/route';
import { mongodbUrl, PORT } from './config';
import path from 'path';
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://ec2-54-242-37-1.compute-1.amazonaws.com'}))

// Middleware to set the MIME type for JavaScript files
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/../public')));

// Use the defined routes
app.use(Router);

// Route to serve the index.html file for all other routes
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

mongoose.connect(mongodbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
