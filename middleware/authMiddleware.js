const authMiddleware = (req,res,next)=>{
const token = req.headers.authorization?.split(" ")[1]
    if(token){
        next()
    }
    else{
        res.json({msg:"you are not login please login first !"})
    }
}

module.exports = authMiddleware