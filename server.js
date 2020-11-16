const express = require('express');
const app =express();
const bodyParser=require("body-parser")
const data =require("./data/img_link")
const dashboard=require("./route/home")
const mongoose = require('mongoose');
const auth=require("./data/login-model")
const upload=require("./route/upload")
const session=require("express-session");
const imageModel=require("./data/img-model")
const profile=require("./route/profile")
const bcrypt = require('bcrypt')

const sess={
    name:"photo",
    secret:'For friends',
    resave:true,
    saveUninitialized:true,
    cookie:{path:"/",maxAge:1000*60*60}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(sess))
app.use(express.static("upload"))
mongoose.connect('mongodb+srv://aditya:@gallary.fbhcg.mongodb.net/gallary?retryWrites=true&w=majority',
 { useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false

}).catch(error => console.log("database disconnected"));
  app.use(bodyParser.urlencoded({extended:true}))
   
    app.set("view engine","ejs")
    app.use("/",dashboard)
    app.use(express.static("public"))
    app.use("/image",upload)
    app.use("/profile",profile)



app.get("/",function(req,res){
 
   res.render("login",{data:data,status:""})
});
const isconnect = (req,res,next)=>{
    mongoose.connect('mongodb+srv://aditya:ENV.PROCESS.Pass@gallary.fbhcg.mongodb.net/gallary?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true }).
  catch(error => {
        res.render("login",{data:data,status:"database not connected"})
    })
    next()
    return
} 
app.post("/",isconnect,async function(req,res){
    req.session.email=req.body.email
    const hash=await bcrypt.hash(req.body.password,10)
        
    if(req.body.btn=="register"){
        //Creating User document
        const User =new auth({
            username:req.body.name,
            email:req.body.email,
            password:hash
        })
        //Save data into MongoDB
        User.save( function(err,result){
            if(err){
                res.render("login",{status:"something wrong"}) 
            }else{
                //Here,email are also stores in file collections 
                const data=new imageModel({
                    email:result.email,
                    profile:"profileimage/woman-1807533_1920.jpg"
                })
                data.save((err,result)=>{
                    res.render("login",{status:"Register completed"})
                })                
            }  
        })
    }
    if(req.body.btn=="Login"){
     
       auth.findOne({email:req.body.email},function(err,result){    
        if(err){
            res.redirect("/")
            }
            if(result){
               console.log(result+"user found")
               //bcrypt.compareSync(myPlaintextPassword, hash); //true
                
               if(bcrypt.compareSync(req.body.password,result.password)){
                   if(req.session){
                    req.session.email=result.email
                    req.session.name=result.username
                    res.redirect("/home")
                    }else{
                        res.redirect("/")
                    }
                }else{
                    res.render("login",{status:"Wrong password"})
                }   
           }else{
            res.render("login",{status:"Invalid Email"})
           }
        })   
    }
       
})
app.listen( 3000,function(){
        
    console.log("Server started at 3000")
});


