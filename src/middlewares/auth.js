const adminAuth=(req,res,next)=>{
    const token="xyz"
const tockenvalid= token==="xyz"
if(!tockenvalid){
    res.status(401).send("admin auth not valid")
}
else{
    next()
}
}

module.exports={adminAuth,}