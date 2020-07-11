const express = require('express');
const app =express();
const dashboard=require("./route/login")




app.use("/home",dashboard)
app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",function(req,res){
    res.render("login")
});
app.get("login",function(req,res){
    res.render("login")
})
app.listen(3000,function(err){
    if(err){
        console.log(err);    
    }
    console.log("Server Start at 3000")
});