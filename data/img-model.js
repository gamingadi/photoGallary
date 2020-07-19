const mongoose = require('mongoose');
const imgSchema = mongoose.Schema({
    profile_img:String,
    link:Array
})
const imgModel=mongoose.model("imglinks",imgSchema)
module.exports=imgModel;
module.exports.Schema=imgSchema;
