const mongoose = require('mongoose');
const imgModel=require('../data/img-model')
const loginSchema=new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true,
        index:1,
        required:true
       
    },
    password:{
        type:String,
        required:[1]
    }
})
const auth=mongoose.model("login",loginSchema);
module.exports=auth;