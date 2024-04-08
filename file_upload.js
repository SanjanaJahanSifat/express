const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
//final upload folder
const UPLOAD_FOLDER = './uploads/';
//define the storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,UPLOAD_FOLDER);
    },
    filename: (req,file,cb)=>{
        //Important File.pdf => important-file-6543676685.pdf
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-")+"-"+Date.now();
        cb(null,fileName+fileExt);
    },
});
//prepare the final multer upload object
var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1000000,
    },
    fileFilter: (req,file,cb)=>{
        if(file.fieldname === "avatar"){
            if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
                cb(null,true);
            }else{
                cb(new Error('Only .jpg, .png, .jpeg format are allowed'));
            }
        }else if(file.fieldname === "doc"){
            if(file.mimetype === 'application/pdf'){
                cb(null,true);
            }else{
                cb(new Error('Only .pdf format is allowed'));
            }
        }
        
    },
});
//single file upload
/*app.post('/',upload.single("avatar"),(req,res)=>{
    res.send('Home');
});*/
//multiple file upload
/*app.post('/',upload.array("avatar",3),(req,res)=>{
    res.send('Hello World');
});*/
//multiple field upload
app.post('/',upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "doc", maxCount: 1},
]),(req,res)=>{
    console.log(req.files);
    res.send('Hello Sifu');
});
//default error handler
app.use((err,req,res,next)=>{
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send('There is an upload error');
        }else{
            res.status(500).send(err.message);
        }  
    }else{
        res.status(500).send('Successful');
    }
});
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});