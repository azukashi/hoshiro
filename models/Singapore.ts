import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String,
    personality: String,
    birthdate: String,
    group: String,
    status: String,
    handle: String,
});

export default mongoose.model('Singapore', schema);
