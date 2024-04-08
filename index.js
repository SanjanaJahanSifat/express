const express = require('express');
const app = express();
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded());
app.locals.title = 'My app';
app.use(express.static(__dirname+'/public/',{
    index: 'home.html'
})
);
app.get('/',(req,res)=>{
    res.send('This is home page');
});
app.post('/',(req,res)=>{
    console.log(req.body);
    res.send('This is home page with post request');
});
app.listen(3000,()=>{
    console.log('listening on port 3000');
});

