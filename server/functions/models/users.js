import mongoose from "mongoose"

const UserData = mongoose.Schema({

    username: {type: String, required: true, unique: true},

    password: {type: String, required: true},

    createdAt: {type: Date, default: Date.now},

    prompts: {
        type: [
            {
            prompt: String,
            date: {type: Date, default: Date.now}
            }
        ], 
    default: []
    },
    totalPrompts: {type: Number, default:0}
    
});
const userData = mongoose.model('userData', UserData);
export {userData};