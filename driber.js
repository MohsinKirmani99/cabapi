
//driver entry route
app.post('/cab/driverlogin',async(req,res)=>{
    try{
        const loginD= new driver(req.body)
        const infoD= await loginD.save()
        if(!infoD) return res.json({mssg:"failed to send"})
        res.json({mssg:"Dtaa captred",infoD})
    }
    catch(error){
        res.json({ error: error.message });
    
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

//driver response

app.patch('/cab/update/:id',async(req,res)=>{
    try {
        const{id}= req.params
        const statusChange = await dbModel.findByIdAndUpdate(id,req.body);
        if (!statusChange) return res.status(404).json({ message: 'failed to update' });
        res.json({mssg:'updated successfully',statusChange})

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
