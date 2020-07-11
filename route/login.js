const express = require('express');
const router=express.Router();

router.use((res,req,next)=>{
    console.log("dont now")
    
    next()
})
router.get("/",function(req,res){
    res.render("login")
});

module.exports=router;