const express = require('express');
const router=express.Router();
const multer=require('multer')
const data=require("../data/img-model")

router.use((req,res,next)=>{
    if(req.session.email){
        next()
    }else{
        res.redirect("/")
    }
})


const storage=multer.diskStorage({
    destination:"upload/profileImage",
    filename:(req,file,cb)=>{
        if(file!=null){
        cb(null,file.originalname)
        }
    }
})


const upload=multer({storage:storage})

router.post("/",upload.single("file"),function(req,res){
    let filepath="profileimage/"+req.file.originalname
if(req.file){
    data.findOneAndUpdate({email:req.session.email},{profile:filepath},{new:true},function(err,result){
    if(result){
        console.log("new Profile Photo=>"+result)
        res.redirect(req.session.currentpage)
    }
})
}})
module.exports=router