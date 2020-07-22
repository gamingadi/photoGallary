const express = require('express');
const bodyParser=require("body-parser")
const router=express.Router();
const imageModel=require("../data/img-model")
const multer = require('multer');

const storage=multer.diskStorage({
    destination:"upload/image",
    filename:(req,file,cb)=>{
        if(file!=null){
        cb(null,file.originalname)
    }
    }
})
const upload=multer({storage:storage})

router.use(bodyParser.urlencoded({extended:true}))
router.use((req,res,next)=>{
    if(req.session.email){
        next()
    }else{
        res.redirect("/")
    }
})
router.get("/",function(req,res){

    res.render("upload",{profile:"/"+req.session.data.profile,name:req.session.name,status:""})
})
//multer middle take care of uploading file & all opreation
router.post("/",upload.single("file"),async function(req,res){
   //save the data of file in database
   
   const filePath=req.file.originalname 
   if(filePath!=null && req.session.email!=null){
        var query=await imageModel.findOne({email:req.session.email})
        query.link.push("image/"+filePath)
        query.save((err,result)=>{
            if(result)
              {  console.log("image pushed in link Array"+result)
                res.render("upload",{profile:result.profile, name:req.session.name, status:"UPLOADED....."})  
                }else{
                    res.render("upload",{profile:result.profile,name:req.session.name, status:"Database issue"})
                }
            })
    }
    else{
        res.redirect("/upload")}
})
module.exports=router;