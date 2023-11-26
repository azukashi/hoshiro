import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: String,
    personality: String,
    birthdate: String,
    group: String,
    handle: String,
});

export default mongoose.model('Indonesia', schema);
