const express = require('express');
const app = express();
const router = express.Router({
    caseSensitive: true,
});
app.set('view engine','ejs');
app.route('/about/mission')
    .get((req,res)=>{
        res.render('pages/about');
    })
    .post((req,res)=>{
        res.send('This is home page with post request');
    })
    .put((req,res)=>{
        res.send('This is home page with put request');
    });
app.listen(3000,()=>{
    console.log('listening on port 3000');
});