const mongoose= require("mongoose")
const Schema= mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true , match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']},
        password:{type:String,required:true},
        carname:{type:String,required:true}
        
    },{timestamps:true})

const driverData= mongoose.model("Infodriver",Schema)
module.exports= driverData    