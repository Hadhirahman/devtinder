const express = require("express");
const app = express();
const connectDB = require("./config/database")
const { adminAuth } = require("../src/middlewares/auth")
const port = 9526;
const dotenv=require("dotenv")
dotenv.config()

const User=require("./models/user")
 app.use(express.json());

app.post("/signup",async (req,res)=>{

try{


    
    const {firstName,lastName,age,emailId}= req.body
    
    if(firstName&&lastName&&age&&emailId){
        const userObj={
            firstName:firstName,
            lastName:lastName,
            age:age,
            emailId:emailId
        }
          const user =new User(userObj)
    const savedUser = await user.save();
     res.status(201).json({
      message: "✅ User created successfully!",
      user: savedUser,
    });
    }else{
        res.send("data not fullfilled")
    }
    
  
    }catch{
        res.status(500).json({ error: "Error creating user" });
    }

})


connectDB().
    then(() => {
        console.log("db connected success fully");
        app.listen(process.env.PORT, () => {
            console.log("server has running now");
        })
    })


    .catch((err) => {
        console.error("db not connected")
    })
