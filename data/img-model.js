const mongoose = require('mongoose');
const imgSchema = mongoose.Schema({
    email:String,
    profile:String,
    link:Array
})
const imgModel=mongoose.model("imglinks",imgSchema)
module.exports=imgModel;

