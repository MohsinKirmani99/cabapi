const jwt = require("jsonwebtoken");
const Secret = "notesapi";
const passenger = require("../Schema/userData");
const dbModel = require("../Schema/model");
const bcrypt= require("bcrypt")


//////passenger only routes////

//user signup route.
const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await passenger.findOne({ email });
    if (existing) {
      res.json({ mssg: "Already exist" });
    } else {
      //password hash 
      const hashPassword= await bcrypt.hash(password,10)
      // Create a new user
      const newUser = new passenger({ name, email, password:hashPassword });
      await newUser.save();

      //genrating token
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, Secret);
      res.json({ user: newUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user login route

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await passenger.findOne({ email });
    //password decrypt
    const validPass = await bcrypt.compare(password, userEmail.password)
    if (!userEmail && password===validPass) {
      res.json({ mssg: "Invalid username or password" });
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

// user rideentry route

const rideRequest = async (req, res) => {
  try {
    //const{passengerinfo,pickup,drop,ridetype,price,payment}= req.body
    const userAm = new dbModel(req.body);
    const savedDT = await userAm.save();
    console.log("4567", savedDT);
    //const findQ= await dbModel.find()
    //const populateData= await dbModel.populate("passengerinfo")
    if (!savedDT) return res.status(404).json({ message: "something wrong" });
    res.json({ mssg: "ride created", savedDT });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//passenger check route which driver accept ride
const rideCheck = async (req, res) => {
  dbModel
    .find()
    .populate("postedBy")
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
  //const data=await dbModel.find()
  //const populateData= await dbModel.populate('InfoUser')
  //res.json({mssg:"ride check",populateData})
};

module.exports = { rideCheck, rideRequest, newUser, userLogin };
