const express = require('express');
const app = express();

/*const middleware1=(req,res,next)=>{
    console.log('I am logging1');
    next();
};
const middleware2=(req,res,next)=>{
    console.log('I am logging2');
    next();
};
app.use(middleware1);
app.use(middleware2);*/
const logger = (req,res,next)=>{
    console.log(`${new Date(Date.now()).toLocaleString()}-${req.method}-${req.originalUrl}-${req.protocol}-${req.ip}`);
    next();
};
app.use(logger);
app.get('/about',(req,res)=>{
    res.send('About');
})
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});