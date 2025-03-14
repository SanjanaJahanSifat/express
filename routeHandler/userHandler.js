const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User",userSchema);
//signup
router.post('/signup',async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            name:req.body.name,
            username:req.body.username,
            password:hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: 'Signup is successful',
        });
    } catch (err) {
        res.status(500).json({
            error: 'Signup failed',
        });
    }
});
//login
router.post('/login',async(req,res)=>{
    try{
        const user = await User.find({username:req.body.username});
        if(user && user.length>0){
            const isValidPassword = await bcrypt.compare(req.body.password,user[0].password);
            if(isValidPassword){
                //generate token
                const token = jwt.sign({
                    username:user[0].username,
                    userId:user[0]._id,
                },process.env.JWT_SECRET,{
                    expiresIn:'1h'
                });
                res.status(200).json({
                    access_token:token,
                    message:'Login Successful',
                });
            }else{
                res.status(401).json({
                    error:'Authentication failed',
                });
            }

            }else{
                res.status(401).json({
                    error:'Authentication failed',
                });
            }
        
    }catch{
        res.status(401).json({
            error:'Authentication failed',
        });
    }
});
//get all the users
router.get('/all',async(req,res)=>{
    try{
        const users = await User.find({
            status:'active'
        }).populate("todos");
        res.status(200).json({
            data:users,
            message:'Success',
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:'There was a server side error',
        });
    }
})
module.exports=router;