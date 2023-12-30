import mongoose from 'mongoose';

export interface UserDocument {
    username: string;
    password: string;
    token?: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
    username: String,
    password: String,
    token: String,
});

export default mongoose.model<UserDocument>('User', userSchema);
