const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const JWT_SECRET = "Ranjanisagoodboy";
var jwt =require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

//Get Prediction
router.get('/predictKNN',(req,res)=>{
  const InpFilePath  = req.query.Input;
  const PyFilePath = "../../../Documents/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/KNN.py"
  const {spawn} = require('child_process');
  const childPython = spawn('python',[PyFilePath,InpFilePath]);

  childPython.stdout.on('data', (data)=>{
      res.send({"result":`${data}`}) 
  });

  childPython.on('close', (code)=>{
      console.error(`child process exited with code ${code}`)
  }) 
  
  childPython.on("end",()=>{
    console.log("python file ran successfully");
  })

  childPython.stderr.on("data",(data)=>{
    console.log(`stdout:${data}`)
  })
})

router.get('/predictLDA',(req,res)=>{
  const InpFilePath  = req.query.Input;
  const PyFilePath = "../../../Documents/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/LDA.py"
  const {spawn} = require('child_process');
  const childPython = spawn('python',[PyFilePath,InpFilePath]);

  childPython.stdout.on('data', (data)=>{
      res.send({"result":`${data}`}) 
  });

  childPython.on('close', (code)=>{
      console.error(`child process exited with code ${code}`)
  }) 
  
  childPython.on("end",()=>{
    console.log("python file ran successfully");
  })

  childPython.stderr.on("data",(data)=>{
    console.log(`stdout:${data}`)
  })
})

router.get('/predictAE',(req,res)=>{
  const InpFilePath  = req.query.Input;
  const PyFilePath = "../../../Documents/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/AE.py"
  const {spawn} = require('child_process');
  const childPython = spawn('python',[PyFilePath,InpFilePath]);

  childPython.stdout.on('data', (data)=>{
      res.send({"result":`${data}`}) 
  });

  childPython.on('close', (code)=>{
      console.error(`child process exited with code ${code}`)
  }) 
  
  childPython.on("end",()=>{
    console.log("python file ran successfully");
  })

  childPython.stderr.on("data",(data)=>{
    console.log(`stdout:${data}`)
  })
})

//Create a User using : POST "/api/auth/createUser"

router.post('/createUser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })],
     async (req, res) => {
       let success = false;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
        try{
          
          if (!errors.isEmpty()) {
            return res.status(400).json({success: success, errors: errors.array() });
        }
        // Check whether the user with this emoil exists already
        let user = await User.findOne({email: req.body.email});
        if(user){
          return res.status(400).json({success: success,error:"Sorry a user with this email already exists"});
        } 

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt); 


        user  = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
          id: user.id
        }
      }

      const authtoken = jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success: success,authtoken});
    }catch(error){
      console.error(error.message);
      res.status(500).send="Internal Server Error";
}})

//Authenticate a User using : POST "/api/auth/login" No login required
router.post('/login', [
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success=false;
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({success:success, errors: errors.array() });
      }
      // Check whether the user with this emoil exists already
      const {email, password} = req.body;
      try{
        let user = await User.findOne({email});
        if(!user)
          return res.status(400).json({success:success,error: "Please try to login with correct credentials"});
          
          const passwordCompare = await bcrypt.compare(password,user.password);
          if(!passwordCompare){
            return res.status(400).json({success:success,error:"Please try to login with correct credentials"});
          }
          
          
          const data={
            user:{
              id: user.id
            }
          }

      const authtoken=  jwt.sign(data,JWT_SECRET);
      success=true;

      res.json({success:success,authtoken});
    }catch(error){
      console.error(error.message);
      res.status(500).send="Internal Server Error";
    }
})

// ROUTE 3: Get loggedin User Details using : POST "/api/auth/getuser" .Login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try{
    let userId="";
    userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }




})

module.exports= router
