import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: true,
        trim: true,
        match: [/^[0-9]+$/, "Only numeric characters"]
    },
    swiftCode: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        match: [/^[0-9]+$/, "Only numeric characters"]
    },
    currency: {
        type: String,
        required: true
    },
    receiverAccountNumber: {
        type: Number,
        required: true,
        trim: true,
        match: [/^[0-9]+$/, "Only numeric characters"]
    },
    receiverSwiftCode: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
})

export default mongoose.model("Transfer", transferSchema);