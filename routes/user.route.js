const express = require("express")
const UserModel = require("../model/user.model")
const userReg = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

userReg.post("/register", async (req, res)=>{
    // const payload = req.body
    const {name,email,gender,password,age,city,is_married}= req.body
    // console.log(payload.email)
    const usercheck = await UserModel.find({email:email})
  if(usercheck.length==0){
    bcrypt.hash(password, 5, async(err, hash)=>{
        const newUser = new UserModel({name, email, gender, password:hash, age, city, is_married})
        newUser.save()
        res.status(200).send({
            msg : "Registeration success"
        })
    })
   
  }else{
    res.status(400).send({
        msg: "User already exist, please login"
    })
  }
  
})

userReg.post("/login", async (req, res)=>{
     const {email, password} = req.body
     const logcheck = await UserModel.find({email:email})
     if(logcheck.length>0){
    const token = jwt.sign({userId:logcheck[0]._id}, "linked")
    bcrypt.compare(password, logcheck[0].password, async (err, result)=>{
         if(result){
            res.status(200).send({
                msg:"Login success",
                token: token
            })
         }else{
            res.status(400).send({
                msg: "Login Failed"
            })
         }
    })
       
     }else{
        res.send({
            msg: "No Account Found"
        })
     }
})

module.exports = userReg