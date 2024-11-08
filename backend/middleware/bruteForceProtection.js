import Expressbrute from 'express-brute';
import MongooseStore from 'express-brute-mongoose';
import mongoose from 'mongoose';

const bruteForceSchema = new mongoose.Schema({
    _id: String,
    data: {
        count: Number,
        lastRequest: Date,
        firstRequest: Date
    },
    expires: { type: Date, index: { expires: "1d" }}
});

const BruteForceModel= mongoose.model("bruteForce", bruteForceSchema);

const store = new MongooseStore(BruteForceModel);

const bruteForce = new Expressbrute(store, {
    freeRetries: 2,
    minWait: 1 * 60 * 1000, //1 Mintues
    maxWait: 1 * 60 * 1000, //1 Mintues
    failCallback: function(req, res, next, nextValidRequestDate){
        res.status(429).json({
            message: "Too many failed attempts. Please try again later.",
            nextValidRequestDate
        });
    }
});

export default bruteForce