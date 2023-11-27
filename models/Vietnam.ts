import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String,
    personality: String,
    birthdate: String,
    group: String,
    status: String,
    ch_id: String,
});

export default mongoose.model('Vietnam', schema);
