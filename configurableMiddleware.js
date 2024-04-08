const express = require('express');
const cookieParser = require('cookie-parser');
//third part middleware cookie
const app = express();
app.use(cookieParser());
//built in middleware
app.use(express.json());
const adminRouter = express.Router();
const loggerWrapper=(options)=>
    function(req,res,next){
        if(options.log){
            console.log(`${new Date(Date.now()).toLocaleString()}-${req.method}-${req.originalUrl}-${req.protocol}-${req.ip}`);
            next();
        }else{
            throw new Error('This is an error');
        }

    };

adminRouter.use(loggerWrapper({log:true}));
adminRouter.get('/dashboard',(req,res)=>{
    res.send('Admin dashboard');
});
app.use('/admin',adminRouter);

app.get('/about',(req,res)=>{
    res.send('About');
});
const errorMiddleware = (err,req,res,next)=>{
    console.log(err.message);
    res.status(500).send('There is a server side problem');
};
adminRouter.use(errorMiddleware);
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});