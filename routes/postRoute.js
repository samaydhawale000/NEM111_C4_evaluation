const express = require("express");

const postRoute = express.Router();
var jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/authMiddleware");
const postModel = require("../module/postModel");

postRoute.use(authMiddleware)

postRoute.get("/",async (req,res)=>{
 
    try{
        
        const token = req.headers.authorization?.split(" ")[1]
        jwt.verify(token, 'shhhhh', async (err, decoded)=> {
            const userId = decoded.userId
            
            if(req.query.device){
                
                const data = await postModel.find({userId, device:req.query.device})
                res.json({posts:data})
            }
            else{
                const data = await postModel.find({userId})
                res.json({posts:data})
            }
          });
      
    }
    catch(err){
        console.log(err)
    }
})

postRoute.post("/add",async (req,res)=>{

    const {title,body,device} = req.body
    const token = req.headers.authorization?.split(" ")[1]

    try{
        jwt.verify(token, 'shhhhh', async (err, decoded)=> {
            const userId = decoded.userId
          const data =  await postModel.create({title,body,device,userId})
           res.json({posts:data})
          });
    }
    catch(err){
        console.log(err)
    }
})


postRoute.patch("/update/:id",async (req,res)=>{

    const token = req.headers.authorization?.split(" ")[1]

    try{
        if(req.params.id){
            jwt.verify(token, 'shhhhh', async (err, decoded)=> {
                const userId = decoded.userId
                const id = req.params.id
                const data = await postModel.findOne({_id:id})
                if(data.userId ==userId){
                    const data = await postModel.updateOne(req.body)
                    res.json({msg:"post updated successfully" , updatedPost:data})
                }
                else{
                    res.json({msg:"You are not authorize to delete this post"})
                }
              });
        }
        else{
            res.json({msg:"Please provide id for update"})
        }
    }
    catch(err){
        console.log(err)
    }
})


postRoute.delete("/delete/:id",async (req,res)=>{

    const token = req.headers.authorization?.split(" ")[1]

    try{
        if(req.params.id){
            jwt.verify(token, 'shhhhh', async (err, decoded)=> {
                const userId = decoded.userId
                const id = req.params.id
                const data = await postModel.findOne({_id:id})
                if(data.userId ==userId){
                    const data = await postModel.deleteOne()
                    res.json({msg:"post Deleted successfully" , deletedPost:data})
                }
                else{
                    res.json({msg:"You are not authorize to delete this post"})
                }
              });
        }
        else{
            res.json({msg:"Please provide id for delete"})
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = postRoute