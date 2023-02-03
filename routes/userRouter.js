const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const userRouter = express.Router()


//signs up user
userRouter.post('/signup', (req, res, next)=>{
    User.find({username:req.body.username}, (err, foundUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
if(foundUser[0]?.username){
    res.status(500)
    return  res.send(next(new Error("Username already exists")))
}       
req.body.username = req.body.username.toLowerCase()
    const newSavedUser = new User(req.body)
    newSavedUser.save((err, foundUser)=>{
        
        if(err){
            res.status(500)
            return next(err)
        }      
        const token = jwt.sign({foundUser}, process.env.SECRET)
       return  res.send({user:foundUser, token})
    })
})
})

//controls user login
userRouter.post('/login', (req, res, next)=>{
    console.log(req.body)
   User.findOne({username:req.body.username}, (err, foundUser)=>{
  
    console.log(foundUser)
if(err){
    res.status(500)
    return next(err)
}
        //checks username to see if it exists
if(!foundUser){
    res.status(500)
    return(next(new Error("Username doesn't exist")))
}
if(foundUser){
        //checks the password for match (this needs to be removed)
if(req.body.password !== foundUser?.password){
  res.status(500)
  return next(new Error("Password is incorrect"))
}

const token = jwt.sign({foundUser},  process.env.SECRET)
return res.send({user:foundUser, token})
}})
})




module.exports = userRouter