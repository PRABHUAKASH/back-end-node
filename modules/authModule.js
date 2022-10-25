const jwt = require("../connect")

exports.authenticateUser = (req,res,next) => {
  if(!req.headers.accesstoken)
  res.status(400).send({msg:"Token Not Found"});

  // Verify Token
 
  try{
    const user = jwt.verify(req.headers.accesstoken,process.env.SECRET_KEY)
    req.body.currentuser = user;
    next();

  }catch(err){
    console.error(err);
    res.status(400).send({msg:"Unathorised"});

  }
}

// Authorisation 

exports.authorizeuser = (req,res,next) =>{
  if(req.body.currentuser.role === "admin") next();
  else res.status(404).send({msg:"forbiden : No access"});
}