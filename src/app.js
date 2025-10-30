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

    const user=new User(req.body)
try{
    await user.save()
    res.send("user added successfully")
    }catch(err){
        res.status(500).json({ error: "Error creating user"+err.message });
    }

})


app.get("/feed",async (req,res)=>{
    const userEmail=req.body.emailId
    try{
       const user=await User.find({})
       if(user.length===0){
        res.status(402).send("user not found in db")
       }else{
           res.send(user)
       }  
    }catch(err){
        res.status(500).send("something went wrong")
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
