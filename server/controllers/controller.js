const  User  = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const otpGenerator= require('otp-generator')

exports.verifyUser = async (req, res, next) =>{
    try {
        const {username} =req.method == 'GET' ? req.query: req.body;
        let userExist= await User.findOne({username});
        if(!userExist) return res.status(404).send({error: "Can't fin User"});
        next();

    } catch (error) {
        return res.status(404).json({ error: "Authentication Error" });
    }
}

exports.register = async (req, res) => {
    try {
        const { username, password, profile, email } = req.body;
        console.log(req.body)
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(500).json({ error: "Username already taken"});
        }
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(500).json({ error: "Email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            profile,
            email,
        });
        await newUser.save();
        return res.status(201).json({ msg: "User Registered Successfully" });
    } catch (error) {
        console.log("e",error)
        return res.status(500).json({ error: "Unable to register user" });
    }
};

exports.login = async(req,res) => {
    try {
        const { username, password } = req.body;

        const user= await User.findOne({ username })
        if (!user) return res.status(400).send({ error: "User not found" });

        const passwordCheck= await bcrypt.compare(password,user.password)
        if(!passwordCheck) return res.status(400).send({error: "Invalid password"})
        const token = jwt.sign(
        {
            userId: user._Id,
            username: user.username
        }, 
        'secret', 
        {expireIn: "24h"});

        return res.status(200).send({
            msg: "Login successful...",
            username: user.username,
            token
        })
    }catch (error) {
    return res.status(500).json({ error});
    }
};

exports.getUser = async(req,res) => {
    const {username}= req.params;
    try {
        if(!username) return res.status(501).send({error: "Invalid Username"});
        const user = await User.findOne({username})
        if(!user) return res.status(500).send({error: "Couldn't find User"});
        const {password,...rest} =Object.assign({},user.toJSON());
        return res.status(201).send(rest);
    

    } catch (error) {
        return res.status(404).send({error: "Cannot Find Data"})
    }
}

exports.updateUser = async(req,res) => {
  try {
    const id=req.query.id;
    if(id){
        const body=req.body
        const user=await User.updateOne({_id: id},body)
        if(user) return res.status(201).send({msg: "Record Updated..."});
    }
    else{
        return res.status(401).send({error: "User not found"});
    }

  } catch (error) {
    return res.status(401).send({error})
  }
}

exports.generateOTP= async(req,res) => {
        req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
        res.status(201).send({code: req.app.locals.OTP})
}

exports.varifyOTP = async(req,res) => {
  const {code}= req.query;
  if(parseInt(req.app.locals.OTP)===parseInt(code)){
    req.app.locals.OTP= null;
    req.app.locals.resetSession=true;
    return res.status(201).send({msg: "Vaarify successfully..."})
  }
  return res.status(400).send({error: "Invalid OTP!"})
}

exports.createResetSession = async(req,res) => {
  if(req.app.locals.resetSession){
    req.app.locals.resetSession=false;
    return res.status(201).send({msg: "Access granted"})
  }
  return res.status(440).send({error: "Session expire..."})
}

exports.resetPassword = async(req,res) => {
    try {
        if (!req.app.locals.resetSession)
            return res.status(440).send({ error: "Session expired" });
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ error: "Username not found" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne({ username: user.username }, { password: hashedPassword });
        return res.status(201).send({ msg: "Record updated" });
    } catch (error) {
        return res.status(500).send({ error: "Unable to reset password" });
    }
}


// exports.register = async (req, res) => {
//     try {
//         const { username, password, profile, email } = req.body;
//         const existingUserUsername = await User.findOne({ username });
//         if (existingUserUsername) {
//             return res.status(500).json({ error: "Username already taken" });
//         }
//         const existingUserEmail = await User.findOne({ email });
//         if (existingUserEmail) {
//             return res.status(500).json({ error: "Email is already registered" });
//         }
//         let hashedPassword;
//         try{
//             // no of rounds is 10
//             hashedPassword = await bcrypt.hash(password, 10);

//         }
//         catch(error){
//             return resp.status(500).json({
//                 success:false,
//                 message:"error in hashing password"
//             });

//         }

//         const newUser = await User.create({  username,
//             password:hashedPassword ,
//             profile,
//             email});
          
    
   
//         return res.status(200).json({ msg: "User Registered Successfully" });
//     } catch (error) {
//         console.log("e", error);
//         return res.status(500).json({ error: "Unable to register user" });
//     }
// };