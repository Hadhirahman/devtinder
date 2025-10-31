const jwt=require("jsonwebtoken")
const User=require("../models/user")

const userAuth= async (req,res,next)=>{
try{
const cookies=req.cookies;
const{token}=cookies;
if(!token){
    throw new Error("unauthenticated user no token")
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
const {id}=decoded
const user=await User.findById({_id:id})
if(!user){
   throw new Error("unauthenticated user")
}

req.user=user
next();
}catch(err){
    return res.status(500).send("internal server error "+ err.message)  
}
}


module.exports={userAuth,}