const express = require('express');
const app = express();
app.set('view engine','ejs');
app.get('/about',(req,res)=>{
    //console.log(res.headersSent);
    /*res.render('pages/about2',{
        name: "bangladesh"
    });*/
    //res.json({
       //name: "bangladesh"
    //});
    //res.sendStatus(200);
    /*res.format({
        'text/plain':()=>{
            res.send('Hi');
        },
        'text/html':()=>{
            res.render('pages/about2',{
                name:"Sanjana",
            });
        },
        'application/json':()=>{
            res.json({
                message: 'About',
            });
        },
        default:()=>{
            res.status(406).send('Not acceptable');
        }
    });*/
    /*res.cookie('Sanjana','Bolod');
    res.end();*/
    /*res.location('/test');
    res.end();*/
    /*res.redirect('/test');
    res.end();*/
    res.set('Sifat','Goru');
    console.log(res.get('Sifat'));
    res.end();
    //console.log(res.headersSent);
});
app.get('/test',(req,res)=>{
    res.send('Hello');
});

app.listen(3000,()=>{
    console.log('listening on port 3000');
});