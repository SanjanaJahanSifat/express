const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');
app.use(express.json());
dotenv.config();
//database connection initialization
mongoose.connect('mongodb://localhost/todos')
    .then(()=> console.log('Connection Successful'))
    .catch(err => console.log(err))
app.use('/todo',todoHandler);
app.use('/user',userHandler);
//default error handler
const errorHandler = (err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }else{
        res.status(500).json({error:err});
    }
};
app.use(errorHandler);
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});