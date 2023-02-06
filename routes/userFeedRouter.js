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

userFeedRouter.get('/currentUserPosts', (req, res, next)=>{    
    const filterById = req.auth.foundUser._id
    UserFeed.find({userId:{$in:[filterById]}}, (err, currentUserFeed)=>{
       
    if(err){
        res.status(500)
        return next(err)
    }

    return res.send(currentUserFeed)
    })
    })

userFeedRouter.post('/addPost', (req, res, next)=>{
    console.log(req.auth.foundUser._id)
    req.body.userId = req.auth.foundUser._id
    req.body.postOrder = Date.now()
    const userSavedPost = new UserFeed(req.body)
    userSavedPost.save((err, newPost)=>{
if(err){
    res.status(500)
    return next(err)    
}
res.send(newPost)
    })
})

// userFeedRouter.delete(`/:postId`, (req,res, next)=>{
// console.log("test")
// })

userFeedRouter.delete('/:postId',(req, res, next)=>{
    console.log("test")
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