import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is needed! Check again your .env file');

mongoose.connect(process.env.DATABASE_URI as string, { retryWrites: true }).then(() => {
    console.log('[INFO] App connected to MongoDB Atlas!');
    app.use('/api', routes);
    app.use(express.json());
    app.listen(port, () => {
        console.log(`[INFO] Express server has been started! (Live at port ${port})`);
    });
});
