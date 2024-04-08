const handler = ((req,res)=>{
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.params);
    console.log(req.query);
    console.log(req.app.get('view engine'));
    console.log(req.accepts('json'));
    console.log(req.get('accept'));
    res.send('Welcome to application home');
});

module.exports = handler;