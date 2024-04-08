const express = require('express');
const app = express();
const router = express.Router({
    caseSensitive: true,
});
app.use(router);

router.get('/about',(req,res)=>{
    res.send('This is home page');
});
router.post('/',(req,res)=>{
    console.log(req.body);
    res.send('This is home page with post request');
});
app.listen(3000,()=>{
    console.log('listening on port 3000');
});