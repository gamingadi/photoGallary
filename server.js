const express = require('express');
const app =express();
const bodyParser=require("body-parser")
const data =require("./data/img_link")
const dashboard=require("./route/home")
const mongoose = require('mongoose');
const auth=require("./data/login-model")
const upload=require("./route/upload")



mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true }).
  catch(error => console.log(error));
app.use(bodyParser.urlencoded({extended:true}))
app.use("/home",dashboard)
app.use(express.static("public"))
app.use("/upload",upload)
app.set("view engine","ejs")

auth.find(function(err,result){
     console.log(result)
})
// auth.findOne({password:"w"},function(err,result){
//     console.log(result)

// })

app.get("/",function(req,res){
    res.render("login",{data:data,status:""})
});

const isconnect = (req,res,next)=>{
    mongoose.connect('mongodb://localhost:27017/gallary', { useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true }).
  catch(error => {console.log(error);
        res.render("login",{data:data,status:"database not connected"})
    })
    next()
    return
} 

app.post("/",isconnect,function(req,res){
   
    if(req.body.btn=="register"){
        const data =new auth({
            username:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        data.save( function(err,result){
            console.log("inside save"+result)
            if(err){
                res.render("login",{status:"something wrong"}) 
            }else{

                res.render("login",{status:"Register completed"})
            }
            
        })
        // .then((result)=>{
        //     res.render("login",{status:"Register completed"})
        
        
        // }).catch((error)=>{
        //     res.render("login",{status:"something wrong"})
        // })
        
    }
    if(req.body.btn=="Login"){
        console.log(req.body)
       auth.findOne({email:req.body.email},function(error,result){    
        if(error){
            res.redirect("/")
            }else{
               console.log(result)
                if(result.password==req.body.password){
                   
                    res.render("home",{data:data})

                }else{
                    res.redirect("/login")
                }   
           }
        })   
    }
       
})
app.listen( 3000,function(){
        
    console.log("Server started at 3000")
});


