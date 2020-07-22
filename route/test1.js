const express = require('express');
const app=express()
const router=express.Router();


router.get("/test1",function(req,res){
res.render("test",{status:""})
})
module.exports=router