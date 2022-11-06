const express = require('express')
const User = require('../models/user.js')
const userCreationRouter = express.Router()

// create a post to create a user with a id

userCreationRouter.post('/', (req, res, next)=>{
    const newSavedUser = new User(req.body)
    newSavedUser.save((err, createdUser)=>{
        if(err){
            res.status(500)
            return next(err)
        }
      
        return res.send(createdUser)
    })
})





module.exports = userCreationRouter