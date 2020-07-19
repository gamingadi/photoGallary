const express = require('express');
const bodyParser=require("body-parser")
const router=express.Router();
const data =require("../data/img_link")
const imageModel=require("../data/img-model")
const loginModel=require("../data/login-model")
const multer = require('multer')
const storage=multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        console.log(file)
        if(file!=null){
        cb(null,file.originalname)
    }
    }
})
const upload=multer({storage:storage})

router.use(bodyParser.urlencoded({extended:true}))
router.use((res,req,next)=>{

    next()
})
router.get("/",function(req,res){
   
    res.render("upload",{data:data.img,status:""})
});

router.post("/",upload.single("file"),function(req,res){
   
    if(req.file!=null){
        if(req.body.image_name==null){
            var image_name=req.file.originalname
        }else{
            var image_name=req.body.image_name
        }
        const upload_image=new imageModel({
            link:req.file.originalname
        }).save(console.log("save"))
        
        loginModel.findOneAndUpdate({email:req.body.email})
        res.render("upload",{data:data, status:"UPLOADED....."})
    }else{
        res.redirect("/upload")
    }
})
module.exports=router;