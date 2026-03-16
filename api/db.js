import mongoose from 'mongoose';

const URI = process.env.MONGO_URI;

export async function connectDB() {
    mongoose.connect(URI);
}

