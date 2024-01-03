const express= require("express")
const router= express.Router()
const{newDriver,driverLogin,passOtp,statusUpdate,rideCheck}=require('../driver_part/driver')
const verifyToken= require('../middleware/tokenCheck')

//driver signup 
router.post("/driversignup",newDriver)

//driver login
router.post('/driverlogin',driverLogin)

//otp check route
router.patch('/otpverification/:id',passOtp)

//driver ride check
router.get('/drivercheck',verifyToken,rideCheck)

//ride accepted route
router.patch('/driveraccept/:id',statusUpdate)

module.exports=router