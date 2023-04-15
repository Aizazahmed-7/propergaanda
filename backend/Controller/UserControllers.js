import asyncHadnler from 'express-async-handler'
import { User } from '../models/User.js'
import { sendToken } from '../utils/sendToken.js';


export const registerUser = asyncHadnler(async (req, res) => {

    const { name, username, password} = req.body;

    if(!name || !username || !password){
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const user1 = await User.findOne({username})

    if(user1){
        res.status(409);
        throw new Error('User already exists');
    }


    const user = await User.create({
        name,
        username,
        password
    })

    sendToken(res,user,'User created successfully',201);

})



export const loginUser = asyncHadnler(async (req, res) => {

    const { username, password} = req.body;

    if(!username || !password){
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const user = await User.findOne({username}).select('+password');

    if(!user){
        res.status(404);
        throw new Error('Invalid credentials');
    }
    const isMatch =  await user.comparePassword(password);

    if(!isMatch){
        res.status(401);
        throw new Error('Invalid credentials');
    }
    
    sendToken(res,user,'User logged in successfully',200);

})

export const logout = asyncHadnler(async (req, res) => {

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    
    res.status(200).json({
        success: true,
        message: 'logged out successfully'
    })

    res.end();

})

export const getUser = asyncHadnler(async (req, res) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})


export const getAdmin = asyncHadnler(async (req, res) => {

    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})



export const getAllUsers = asyncHadnler(async (req, res) => {
    
        const users = await User.find();
    
        res.status(200).json({
            success: true,
            users
        })
    })
