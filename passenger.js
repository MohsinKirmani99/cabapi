const { model } = require("mongoose")

//user signup route.
app.post("/cab/usersignup",async(req,res)=>{
    try{
        const cpature= new userLogin(req.body)
        const trigger= await cpature.save()
        if(!trigger) return res.josn({mssg:"failed to capture"})
        const existing= await model.findOne({email:email })
        if(existing)return res.json({msg:"Email already exists."});
        res.json({mssg:"User created Successfully",trigger})

    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
})

//user login route

app.get('/cab/userlogin',async(req,res)=>{
    try{
        const{email,password}= req.body

        const userEmail= await model.findOne({email})
        if(userEmail && userEmail.password===password){
             res.json({mssg:"Login Successful",userEmail})
        }
        else{
            res.josn({mssg:"Failed to Login"})
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
})

app.post()
// user rideentry route

app.post('/cab/user',async(req,res)=>{
    try {
        const userAm = new dbModel(req.body);
        const savedDT = await userAm.save();
        if(!savedDT) return res.status(404).json({ message: 'something wrong' });
        res.json(savedDT);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
        
    
})
//passenger check route which driver accept ride

app.get('/cab/usercheck/:id',async(req,res)=>{
    try{

        const data=await driver.findById({})
        res.json({mssg:"ride confirm",data})
    }
    catch(error){
        res.json({ error: error.message });
    
    }
})
