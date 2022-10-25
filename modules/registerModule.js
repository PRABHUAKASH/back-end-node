const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res,next) =>{
    console.log(req.body);
   try{
     // Email validation
     const existUser = await mongo.selectedDb.collection("users").findOne({email:req.body.email});
     if(existUser){
         res.status(400).send({msg:"You are already registerUser"});
     }
     // conform password checking
     const isSamepassword =  checkpassword (req.body.password,req.body.conformpassword);
     if(!isSamepassword)
     return res.status(400).send({msg:"Password doesn't match"});
     else delete req.body.conformpassword;
     // password Encryption
     const randomString = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password,randomString);
 
     // Save in DB
     const insertedResponse = await mongo.selectedDb.collection("users").insertOne({...req.body});
     res.send(insertedResponse);
   }catch(err){
    console.error(err);
    res.status(500).send(err);
   }
};

const checkpassword = (password,conformpassword) =>{
    return password !== conformpassword ? false : true ;
}

exports.signin = async (req,res,next) =>{
    const existUser = await mongo.selectedDb.collection("users").findOne({email:req.body.email});
    if(!existUser){
        res.status(400).send({msg:"You are Not a Register User"});
    }
    // Password checking
    const isSamepassword = await bcrypt.compare(req.body.password,existUser.password);
    if(!isSamepassword)
    return res.status(400).send({msg:"Incorrect Password"});

    // token generation
const token = jwt.sign(existUser,process.env.SECRET_KEY,{expiresIn:"24hr"});
res.send(token);
};