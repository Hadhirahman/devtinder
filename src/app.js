const express=require("express");
const app=express();
const port=9526;
app.use("/",(req,res)=>{
 res.send("hello my dear friend how are you")
})
app.listen(port,()=>{
    console.log("servernhas running now");
    
})