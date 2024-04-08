const express = require('express');
const handler = require('./handler');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
const adminRoute = express.Router();
adminRoute.get('/dashboard',(req,res)=>{
    console.log(req.baseUrl);
    console.log(req.path);
    console.log(req.hostname);
    res.send('We are in admin dashboard');
});
app.use('/admin',adminRoute);
app.get('/user/:id',handler);
app.post('/user/',(req,res)=>{
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.secure);
    console.log(req.route);
    res.send('Welcome to application home wwith post request');
});
app.get('/user/',(req,res)=>{
    console.log(req.route);
    res.send('Welcome to application home wwith get request');
});
app.listen(3000,()=>{
    console.log('listening on port 3000');
});

