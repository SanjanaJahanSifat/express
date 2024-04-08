const express = require('express');
const handle = require('./handle');
const app = express();
const admin = express();
app.locals.title = 'My app';
//app.get('/',handle);
app.enable('case sensitive routing');
app.param('id',(req,res,next,id)=>{
    const user={
        userid: id,
        name: "Bangladesh"
    };
    req.userDetails = user;
    next();
});
admin.get('/dashboard',(req,res)=>{
    console.log(admin.mountpath);
    res.end('Welcome to admin dashboard!');
});
app.get('/user/:id',(req,res)=>{
    console.log(req.userDetails);
    res.send('Welcome to application home');
});
/*app.all('/about',(req,res)=>{
    console.log(req.userDetails);
    res.send('Welcome to application home');
});*/
app.use('/admin',admin);
app.listen(3000,()=>{
    console.log('listening on port 3000');
});

