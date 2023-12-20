const express= require("express")
const mongoose= require("mongoose")
const app= express()
const PORT= process.env.PORT || 4500
const dbModel= require('./Schema/model')
const driver= require('./Login/driverData')
const passenger= require('./Login/userData')


//db connection 
mongoose.connect(process.env.MONGOURI|| 'mongodb+srv://mohsin99:mohsin123@cluster0.5q6ya5r.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log("Connection success"))
    .catch((error)=>console.log("failed to connect"))


//middleware for routes

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


//////passenger only routes////


//user signup route.
app.post('/cab/usersignup',async(req,res)=>{
    try{
        const{name,email,password}= req.body
        const existing= await passenger.findOne({email })
        if(existing){ 
        res.json({mssg:"Already exist"})
    }
    else{
         // Create a new user
         const newUser = new passenger({ name,email,password });
         const sendDtaa=await newUser.save();
         res.json({mssg:"User created Success",sendDtaa})
    }

    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
})

//user login route

app.post('/cab/userlogin',async(req,res)=>{
    try{
        const{email,password}= req.body

        const userEmail= await passenger.findOne({email})
        const userPassword= await passenger.findOne({password})
        if(!userEmail==email && !userPassword==password){
             res.json({mssg:"Login failed"})
        }
        else{
            res.json({mssg:"Login"})
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
})


// user rideentry route

app.post('/cab/user',async(req,res)=>{
    try {
        const userAm = new dbModel(req.body);
        const savedDT = await userAm.save();
        const fetchUser= await dbModel.populate('Infouser')
        if(!savedDT) return res.status(404).json({ message: 'something wrong' });
        res.json(savedDT);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
        
    
})
//passenger check route which driver accept ride

app.get('/cab/usercheck/:id',async(req,res)=>{
    try{

        const data=await dbModel.findById({})
        res.json({mssg:"ride confirm",data})
    }
    catch(error){
        res.json({ error: error.message });
    
    }
})




/////////////driver only routes////////////


//driver signup route
app.post('/cab/driversignup',async(req,res)=>{
    try{
        const{name,email,password,carname}= req.body
        const existing= await driver.findOne({email })
        if(existing){ 
        res.json({mssg:"Already exist"})
    }
    else{
         // Create a new user
         const newUser = new driver({ name,email,password,carname });
         const sendDtaa=await newUser.save();
         res.json({mssg:"User created Success",sendDtaa})
    }

    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
})

//driver login route


app.post('/cab/driverlogin',async(req,res)=>{
    try{
        const{email,password}= req.body

        const userEmail= await driver.findOne({email})
        const userPassword= await driver.findOne({password})
        if(!userEmail==email && !userPassword==password){
             res.json({mssg:"Login failed"})
        }
        else{
            res.json({mssg:"Login"})
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
})





//driver data fetch route

app.get('/cab/driver',async(req,res)=>{
    try{
       
        const passenger= await dbModel.find({price:{$gt:200}})
        res.json(passenger)
    
        //if(find<200) res.json({mssg:"rejected"})
        // res.json({mssg:"accepted"})
    } 
    catch(error){
            res.json({ error: error.message });
    }
})

//driver response accept or reject

app.patch('/cab/update/:id',async(req,res)=>{
    try {
        const{id}= req.params
        const statusChange = await dbModel.findByIdAndUpdate(id,req.body);
        if (!statusChange) return res.status(404).json({ message: 'failed to accept' });
        res.json({mssg:'accept successfully',statusChange})

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

//paseenger boarding and otp check
app.patch('/cab/driverotp/:id',async(req,res)=>{
    try{
        
        //arrived at location msg conditon 
        const{arrived}=req.body
        const location= await dbModel.findOne({arrived:req.body.dreach})
        res.json({mssg:"Present at given location"})

        //otp check condition
        const{driverotp}= req.body
        const checkOtp= await dbModel.findOne({driverotp:req.body.otp});
     
        if(checkOtp){
           res.json({mssg:"otp verified"})
        } 
        else{
            res.json({mssg:"otp not verified"})
        }


    }
    catch(error){
        res.json({error:error.message})
    }
})










//app listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

