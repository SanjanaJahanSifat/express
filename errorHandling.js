const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    for(let i = 0; i<= 10; i++){
        if(i === 5){
            next('there is an error');
        }else{
            res.write('a');
        }
    }
    res.end();
});
//404 error handling
app.use((req,res,next)=>{
   res.status(404).send('There is an error');
   //next('there is an error);
});
/*app.use((err,req,res,next)=>{
    if(err.message){
        res.status(500).send(err.message);
    }else{
        res.status(500).send('Server side error');
    }
});*/
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