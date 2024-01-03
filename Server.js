require("dotenv").config()
const express= require("express")
const mongoose= require("mongoose")
const app= express()
const PORT= process.env.PORT || 4500
//const dbModel= require('./Schema/model')
//const driver= require('./Schema/driverData')
//const passenger= require('./Schema/userData')
//const jwt= require("jsonwebtoken")
//const Secret="notesapi"

const driverRoute=require('./routes/driverRoute')
const userRoute=require('./routes/passengerRoute')

//db connection 
mongoose.connect(process.env.MONGOURI)
    .then(()=>console.log("Connection success"))
    .catch((error)=>console.log("failed to connect"))


//middleware for routes

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//api call for passenger
app.use('/cab/',driverRoute)

//api call for passenger 
app.use('/cab/',userRoute)
 


//app listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

