import express from 'express';
import mongoose from 'mongoose';
import Youtube from 'youtube-api';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();
const app = express();

app.use(express.json());
app.listen(3000, () => {
    console.log('Server has been started!');
});

// TODO Add env key checking

Youtube.authenticate({
    type: 'key',
    key: process.env.YOUTUBE_KEY,
});

mongoose.connect(process.env.DATABASE_URI, { retryWrites: true }).then(() => {
    console.log('Connected to MongoDB Atlas!');
    app.use('/api', routes);
});
