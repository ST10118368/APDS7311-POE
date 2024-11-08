import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z ]+$/, "Only alphabetical characters and space"]
    },
    idNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[0-9]+$/, "Invalid ID"],
        minLength: 13,
        maxLength: 13
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        match: [/^[0-9]+$/, "Only numeric characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
})

export default mongoose.model("User", userSchema);