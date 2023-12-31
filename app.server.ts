import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;

if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required! Please check your .env file');
if (!process.env.SECRET_SESSION) throw new Error('SECRET_SESSION is required! Please check your .env file');

mongoose.connect(process.env.DATABASE_URI as string, { retryWrites: true }).then(() => {
    console.log('[INFO] App connected to MongoDB Atlas!');
    app.listen(port, () => {
        console.log(`[INFO] Express server has been started! (Live at port ${port})`);
    });
});
