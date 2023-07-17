const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../module/userModel");
const userRoute = express.Router();
var jwt = require('jsonwebtoken');



userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    const data =  await userModel.findOne({email});

    if(data.email == undefined){
        bcrypt.hash(password, 5, async (err, hash) => {
            await userModel.create({ name, email, gender, password: hash });
            res.json({
              msg: "User is registed Successfully",
              userDetail: { name, email, gender, password },
            });
          });
    }
    else{
        res.json({msg:"User already registerd!"})
    }
    
  } catch (err) {
    console.log(err);
  }
});


userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {

    const data =  await userModel.findOne({email});

    if(data.email){
        bcrypt.compare(password, data.password, function(err, result) {
            if(result){
                var token = jwt.sign({ userId:data._id}, 'shhhhh');
                res.json({msg:"user login Successfully", token:token})
            }
            else{
                res.json({msg:"User credencilas are not maching try again !!"})
            }
        });
    }
    else{
        res.json({msg:"User credencilas are not maching try again !!"})
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRoute;
