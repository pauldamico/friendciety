const express = require('express')

const UserFeed = require('../models/userFeed.js')
const userFeedRouter = express.Router()


userFeedRouter.get('/', (req, res, next)=>{
UserFeed.find((err, currentUserFeed)=>{
if(err){
    res.status(500)
    return next(err)
}
return res.send(currentUserFeed)
})
})

userFeedRouter.get('/:userId', (req, res, next)=>{
    const filterById = req.params.userId
    UserFeed.find({userId:{$in:[filterById]}}, (err, currentUserFeed)=>{
    if(err){
        res.status(500)
        return next(err)
    }
    return res.send(currentUserFeed)
    })
    })

userFeedRouter.post('/:userId', (req, res, next)=>{
    req.body.userId = req.params.userId  
    req.body.postOrder = Date.now()
    const userSavedPost = new UserFeed(req.body)
    userSavedPost.save((err, newPost)=>{
if(err){
    res.status(500)
    return next(err)    
}
return res.send(newPost)
    })
})

userFeedRouter.delete('/:postId',(req, res, next)=>{
    const postId = req.params.postId
UserFeed.findOneAndDelete({_id:postId}, (err, deletedPost)=>{
    console.log(deletedPost)
if(err){
    res.status(500)
    return(next(err))
}
return res.send(`ID ${deletedPost} has been removed`)
})
})

userFeedRouter.put('/:postId', (req, res, next)=>{
    const updateId = req.params.postId
  
UserFeed.findOneAndUpdate({_id:updateId}, req.body, {new:true}, (err, updatedItem)=>{
if(err){
    res.status(500)
    return next(err)
}
return res.send(updatedItem)
})
})



module.exports = userFeedRouter