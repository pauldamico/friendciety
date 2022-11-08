const express = require('express')
const User = require('../models/user.js')
const userRouter = express.Router()

// create a post to create a user with a id

userRouter.post('/', (req, res, next)=>{
    const newSavedUser = new User(req.body)
    newSavedUser.save((err, createdUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
      
        return res.send(createdUser)
    })
})

userRouter.get('/', (req, res, next)=>{

   User.find((err, users)=>{
if(err){
    res.status(500)
    return next(err)
}
return res.send(users)
   })

})




module.exports = userRouter