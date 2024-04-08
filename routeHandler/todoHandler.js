const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkLogin = require('../middleware/checkLogin');
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo",todoSchema);
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("User",userSchema);
//get active todos
router.get('/active',async(req,res)=>{
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});
router.get('/js',async(req,res)=>{
    const data = await Todo.findByJs();
    res.status(200).json({
        data,
    });
});
//get todos by language
router.get('/language',async(req,res)=>{
    const data = await Todo.find().byLanguage("react");
    res.status(200).json({
        data,
    });
});
//get all the todos
router.get('/',checkLogin,async(req,res)=>{
    // try {
    //     const results = await Todo.find({status:'active'});
    //     res.status(200).json({
    //         result:results,
    //         message: 'Todo was successfully got',
    //     });
    // } catch (err) {
    //     res.status(500).json({
    //         error: 'There was a server side error',
    //     });
    // }
    console.log(req.username);
    console.log(req.userId);
    try {
        const results = await Todo.find({status:'active'}).populate("user","name username -_id").select({
            _id:0,
           __v:0,
            date:0
        }).limit(7);
        res.status(200).json({
            result:results,
            message: 'Todo was successfully got',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
//get a todo by id
router.get('/:id',async(req,res)=>{
    try {
        const results = await Todo.find({_id:req.params.id});
        res.status(200).json({
            result:results,
            message: 'Todo was successfully got',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
//post todo
router.post('/',checkLogin,async(req,res)=>{
    /*const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error:'There was a server side error',
            });
        }else{
            res.status(200).json({
                message:'Todo was successfully inserted',
            });
        }
    });*/
    try {
        const newTodo = new Todo({
            ...req.body,
            user:req.userId
        });
        const todo = await newTodo.save();
        await User.updateOne({
            _id:req.userId
        },{
            $push:{
                todos:todo._id
            }
        })
        res.status(200).json({
            message: 'Todo was successfully inserted',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
//post multiple todo
router.post('/all',async(req,res)=>{
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'Todos were successfully inserted',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
//put todo
router.put('/:id',async(req,res)=>{
    // try {
    //     await Todo.updateOne({_id: req.params.id},{
    //         $set:{
    //             status:'inactive',
    //         }
    //     });
    //     res.status(200).json({
    //         message: 'Todo was successfully updated',
    //     });
    // } catch (err) {
    //     res.status(500).json({
    //         error: 'There was a server side error',
    //     });
    // }
    try {
        const result = await Todo.findByIdAndUpdate({_id: req.params.id},{
            $set:{
                status:'active',
            },
        }
        ,{});
        res.status(200).json({
            message: 'Todo was successfully updated',
        });
        console.log(result);
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
    
});
//delete todo
router.delete('/:id',async(req,res)=>{
    try {
        await Todo.deleteOne({_id:req.params.id});
        res.status(200).json({
            message: 'Todo was successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error',
        });
    }
});
module.exports=router;