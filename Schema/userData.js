const mongoose= require("mongoose")
//const driverInfo= require('./driverData')
const Schema= mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true, match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']},
        password:{type:String,required:true},
        //driver:{ type: mongoose.Schema.Types.ObjectId, ref: 'driverInfo' }
        
    },{timestamps:true})

const passData= mongoose.model("InfoUser",Schema)
module.exports= passData    