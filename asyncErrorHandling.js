const express = require('express');
const fs = require('fs');
const app = express();
app.get('/',[
    (req,res,next)=>{
        fs.readFile("/file-doesnt-exist","utf-8",(err,data)=>{
            console.log(data);
            next(err);
        });
    },
    (req,res,next)=>{
        console.log(data.property);
    },
]);
app.use((req,res,next)=>{
    console.log('I am not called');
    next();
});
//custom error handling
app.use((err,req,res,next)=>{
    if(res.headersSent){
        next('There is a problem');
    }else{
        if(err.message){
            res.status(500).send(err.message);
        }else{
            res.status(500).send('Server side error');
        }
    }
});
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});