import express from "express";
import bcrypt from "bcrypt"
import Transfer from '../models/Transfer.js'
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

//Base route
// router.get('/', (req, res) => {
//     res.send('Hello Transfer');
// })

//Get all users
router.get('/users', authMiddleware, async (req, res) => {
    try
    {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err)
    {
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Get all transfers
router.get('/', authMiddleware, async (req, res) => {
    try
    {
        const transfers = await Transfer.find();
        res.status(200).json(transfers);
    }
    catch(err)
    {
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Create a transfer
router.post('/', authMiddleware, async (req, res) => {
    
    const {accountNumber, swiftCode, amount, currency, receiverAccountNumber, receiverSwiftCode, reference, date, status} = req.body;

    //Request body validation
    if (!accountNumber || !swiftCode || !amount || !receiverAccountNumber || !receiverSwiftCode || !reference)
    {
        res.status(400).json({message: `Please fill in all the required fields`})
    }

    //Creation of new transfer
    const newTransfer = new Transfer({accountNumber, swiftCode, amount, currency, receiverAccountNumber, receiverSwiftCode, reference});
    
    try
    {
        const savedTransfer = await newTransfer.save();
        res.status(201).json({message: `Transfer successful`, savedTransfer })
    }
    catch(err)
    {
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Get transfers by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try
    {
        const transfer = await Transfer.findById(req.params.id);
        if (!transfer)
        {
            res.status(404).json({message: `Transfer not found` })
        }
        res.status(200).json(transfer);
    }
    catch(err)
    {
        console.error("Error: ", err);
        res.status(500).json({message: `Internal server error`, error: err.message });
    }
});

//Get user by ID
router.get('/users/:id', authMiddleware, async (req, res) => {
    try
    {
        const user = await User.findById(req.params.id);
        if (!user)
        {
            res.status(404).json({message: `User not found` })
        }
        res.status(200).json(user);
    }
    catch(err)
    {
        console.error("Error: ", err);
        res.status(500).json({message: `Internal server error`, error: err.message });
    }
});

//Update user by ID
router.put('/users/:id', authMiddleware, async (req, res) => {

    const {fullName, idNumber, accountNumber, email, password, userType} = req.body;
    
    //Request body validation
    if (!fullName || !idNumber || !accountNumber || !email || !password || !userType)
    {
        res.status(400).json({message: `Nothing was changed. Please update field(s) that needs update.`})
    }

    //Checking if user already exists
    const userExists = await User.findOne({ $or: [{email}, {idNumber} ]})
    if (!userExists)
    {
        return res.status(409).json({message: "User doesn't exists"})
    }
    
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedData = {};

    if (fullName) updatedData.fullName = fullName
    if (idNumber) updatedData.idNumber = idNumber
    if (accountNumber) updatedData.accountNumber = accountNumber
    if (email) updatedData.email = email
    if (password) updatedData.password = hashedPassword
    if (userType) updatedData.userType = userType

    try
    {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedUser)
        {
            res.status(404).json({message: `User not found`})
        }
        res.status(201).json({ message: `User Updated`, updatedUser });
    }
    catch(err)
    {
        console.error("Error updating user", err);
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Update transfer by ID
router.put('/:id', authMiddleware, async (req, res) => {

    const {status} = req.body;
    
    //Request body validation
    if (!status)
    {
        res.status(400).json({message: `Nothing was changed. Please update field(s) that needs update.`})
    }
    
    const updatedData = {};

    if (status) updatedData.status = status

    try
    {
        const updatedTransfer = await Transfer.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedTransfer)
        {
            res.status(404).json({message: `Transfer not found`})
        }
        res.status(201).json({ message: `Transfer Verified`, updatedTransfer });
    }
    catch(err)
    {
        console.error("Error verfiying transfer", err);
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Delete transfer by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try
    {
        const transfer = await Transfer.findById(req.params.id);

        if (!transfer)
        {
            res.status(404).json({message: `Transfer not found`})
        }

        await Transfer.findByIdAndDelete(req.params.id);
        res.status(201).json({message: `Transfer deleted`});
    }
    catch(err)
    {
        console.error("Error deleting transfer: ", err);
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

//Delete user
router.delete('/users/:id', authMiddleware, async (req, res) => {
    try
    {
        const user = await User.findById(req.params.id);

        if (!user)
        {
            res.status(404).json({message: `User not found`})
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(201).json({message: `User deleted`});
    }
    catch(err)
    {
        console.error("Error deleting user: ", err);
        res.status(500).json({message: `Internal server error`, error: err.message })
    }
});

export default router