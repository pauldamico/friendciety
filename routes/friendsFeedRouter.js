const express = require('express')
const UserFeed = require('../models/userFeed.js')
const friendsFeedRouter = express.Router()
const User = require('../models/user.js')


//gets all posts from all users added to friends
friendsFeedRouter.get('/:currentUserId', (req, res, next)=>{
    // console.log(req.params.currentUserId)
 const id = req.params.currentUserId
 User.findOne({_id:id}, (err, currentUser)=>{
    
const friendsArray =currentUser?.friends || []
    const filteredArray = friendsArray.map(item=>item.id)  
    UserFeed.find({userId:{$in:filteredArray}}, (err, currentUserFeed)=>{
    if(err){
        res.status(500)
        return next(err)
    }    
    return res.send(currentUserFeed)
    })
})
    })


module.exports =  friendsFeedRouter