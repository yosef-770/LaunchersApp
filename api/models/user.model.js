import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    email: {type: String, required: true},
    user_type: {type: String, required: true},
    last_login: {type: Date},
    },
    {timestamps: true}
);

export default mongoose.model('User', userSchema)

