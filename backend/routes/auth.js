import express, { json } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import bruteForce from "../middleware/bruteForceProtection.js";
import loginAttemptLogger from "../middleware/loginAttemptMiddleware.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


//Base route
router.get('/', (req, res) => {
    res.send('Hello World');
})

//Registration
router.post('/register', async (req, res) => {
    try
    {
        const {fullName, idNumber, accountNumber, email, password, userType} = req.body;

        //Checking if user already exists
        const userExists = await User.findOne({ $or: [{email}, {idNumber} ]})
        if (userExists)
        {
            return res.status(409).json({message: "ID number or email already exists"})
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create user
        const newUser = new User({fullName, idNumber, accountNumber, email, password: hashedPassword, userType});
        await newUser.save();

        return res.status(201).json({message: "User created Successfully!"});

    }
    catch(err)
    {
        console.error("Registration error: ", err);
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
})

//Login
router.post('/login', bruteForce.prevent, async (req, res) => {
    try
    {
        const {email, accountNumber, password} = req.body;

        //Find user by username/email or account number
        const user = await User.findOne({ $and: [{email}, {accountNumber} ]})
        if (!user)
        {
            res.status(404).json({message: `User not found`})
        }

        //Check if user password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({message: `Invalid User credentials`})
        }

        //JWT token cteation
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'});
        res.json({token})
    }
    catch(err)
    {
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Staff Login
router.post('/slogin', bruteForce.prevent, async (req, res) => {
    try
    {
        const {email, password} = req.body;

        //Find user by username/email or account number
        const user = await User.findOne({ $and: [{email} ]})
        if (!user)
        {
            res.status(404).json({message: `User not found`})
        }

        //Check if user password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({message: `Invalid User credentials`})
        }

        //JWT token cteation
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'});
        res.json({token})
    }
    catch(err)
    {
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});


export default router