import mongoose from 'mongoose';

const launchersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String}, 
    rocketType: {type: String, enum:['Shahab3', 'Fetah110', 'Radwan', 'Kheibar']},
    latitude: {type: Number},
    longitude:{type: Number},
    destroyed: {type: Boolean, default: false}
    },
    {timestamps: true}
);

export default mongoose.model('Launcher', launchersSchema)
