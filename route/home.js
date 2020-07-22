const express = require('express');
const app=express()
const router=express.Router();
const data =require("../data/img_link")
const dataModel=require("../data/img-model")
router.use((res,req,next)=>{
  
    
next()
})
app.use(express.static('public'))
router.get("/home",function(req,res){
    
    req.session.currentpage=req.originalUrl
    
    if(req.session.email){
        dataModel.findOne({email:req.session.email},function(err,result){
            console.log(result)
            req.session.data=result//doing for upload route 
            res.render("home",{data:result,name:req.session.name})
            
        })
    }else{
        res.redirect("/")
        req.session.currentpage=req.originalUrl
    }
    
});

module.exports=router;