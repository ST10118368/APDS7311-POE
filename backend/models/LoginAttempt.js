import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email address"],
        immutable: true
    },
    ipAddress: {
        type: String,
        required: true,
        immutable: true
    },
    successLogin: {
        type: Boolean,
        required: true,
        immutable: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

export default mongoose.model("LoginAttempts", loginAttemptSchema);