const express = require('express');
const app=express()
const router=express.Router();
const data =require("../data/img_link")

router.use((res,req,next)=>{
    console.log(data.img.img.length)
    
    next()
})
app.use(express.static('public'))
router.get("/",function(req,res){
    console.log(data.img)
    res.render("home",{data:data.img})
});

module.exports=router;