//const InfoUser= require('../Login/userData')

const mongoose= require("mongoose")
const Schema = mongoose.Schema(
    {
    infoUser:{type:mongoose.Schema.Types.ObjectId,ref:'InfoUser'}, 
    pickup:{type : String, required : true},
    drop:{type : String, required : true},
    price:{type : Number, required : true},
    ridetype:{type:String,required:true},
    payment:{type:String,required:true},
    status:{type:String,required:true,default:'Pending'},
    dreach:{type:String,default:'arriving'},
    otp:{type:Number,default:Math.floor((Math.random() * 9999) + 1),},
    infodriver:{ type: mongoose.Schema.Types.ObjectId, ref: 'Infodriver' }
    
    
    

},{timestamps:true})

const capture= mongoose.model("Cab",Schema)

module.exports = capture

 