const dbModel = require("../Schema/model");
const driver = require("../Schema/driverData");
const jwt = require("jsonwebtoken");
const Secret = "notesapi";
const bcrypt= require("bcrypt")
//const verifyToken= require('../middleware/tokenCheck')

/////////////driver only routes////////////

//driver signup route
const newDriver = async (req, res) => {
  try {
    const { name, email, password, carname } = req.body;
    const existing = await driver.findOne({ email });
    if (existing) {
      res.json({ mssg: "Already exist" });
    } else {
      //password hashing 
      const hash= await bcrypt.hash(password,10)
      // Create a new user

      const newUser = new driver({ name, email, password:hash, carname });
      await newUser.save();

      //genrating token
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, Secret);
      res.json({ user: newUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//driver login route

const driverLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await driver.findOne({ email });
    //password decrypt
    const validPass = await bcrypt.compare(password, userEmail.password)
    if (!userEmail && password===validPass) {
      res.json({ mssg: "Invalid username or Password" });
    }
    //res.json({mssg:"login successful"})
    //genrating token
    const tokenG = jwt.sign(
      { email: userEmail.email, id: userEmail._id },
      Secret
    );
    res.json({ user: userEmail, token: tokenG });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//const verifyToken=async(req,res,next)=>{
//    let token=req.headers['authorization'] || req.body.token;

//    console.log(token)
//    if(token){

//       return  next();
//    }

//    return res.status(403).json({error:"no token provided"})
//}

//driver data fetch route

const rideCheck = async (req, res) => {
  try {
    const passenger = await dbModel
      .find({ price: { $gt: 200 } })
      .populate("infoUser");
    res.json(passenger);
  } catch (error) {
    res.json({ error: error.message });
  }
};

//app.get('/cab/driver',verifyToken,async(req,res)=>{
//  try{

//    const passenger= await dbModel.find({price:{$gt:200}}).populate("infoUser")
//   res.json(passenger)

//if(find<200) res.json({mssg:"rejected"})
// res.json({mssg:"accepted"})
//}
//catch(error){
//      res.json({ error: error.message });
//}
//})

//driver response accept or reject basiis on id patch request

const statusUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const statusChange = await dbModel
      .findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      )
      .populate(["infoUser", "infodriver"]);
    if (!statusChange)
      return res.status(404).json({ message: "failed to accept" });
    res.json({ mssg: "accept successfully", statusChange });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//paseenger boarding and otp check patch requs basis on id to verify otp
const passOtp = async (req, res) => {
  try {
    //arrived at location msg conditon
    const { arrived } = req.body;
    const location = await dbModel.findOne({ arrived: req.body.dreach });
    res.json({ mssg: "Present at given location" });

    //otp check condition
    const { driverotp } = req.body;
    const checkOtp = await dbModel.findOne({ driverotp: req.body.otp });

    if (checkOtp) {
      res.json({ mssg: "otp verified" });
    } else {
      res.json({ mssg: "otp not verified" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { newDriver, driverLogin, passOtp, statusUpdate, rideCheck };
