const express= require("express")
const router= express.Router()
const{rideCheck,rideRequest,newUser,userLogin}= require('../passenger_part/passenger')
const verifyToken= require('../middleware/tokenCheck')
//post route for new user signup
router.post('/usersignup',newUser)

//user login request 
router.post('/userlogin',userLogin)

//riderequest creation by passenger
router.post('/ride',verifyToken,rideRequest)

//data check req which driver accpeted ride
router.get('/ridestatus',rideCheck)

module.exports=router