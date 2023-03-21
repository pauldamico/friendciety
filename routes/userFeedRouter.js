const express = require('express')
const UserFeed = require('../models/userFeed.js')
const userFeedRouter = express.Router()


// list all posts by user
userFeedRouter.get('/currentUserPosts', (req, res, next)=>{   

    const filterById = req.auth._id 
    UserFeed.find({userId:{$in:[filterById]}}, (err, currentUserFeed)=>{     
        
    if(err){
        res.status(500)
        return next(err)
    }

    return res.send(currentUserFeed)
    })
    })
//adds post to user feed
userFeedRouter.post('/addPost', (req, res, next)=>{
    req.body.username = req.auth.username
    req.body.userId = req.auth._id
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

//adds comment to user feed
userFeedRouter.put('/comment/:postId', (req, res, next)=>{
   
    const postId = req.params.postId  
 req.body.comments[0].username=req.auth.username

UserFeed.findOneAndUpdate({_id:postId}, {$push:req.body}, {new:true}, (err, updatedItem)=>{
console.log(updatedItem)
if(err){
    res.status(500)
    return next(err)
}
return res.send(updatedItem.comments)
})
})

//deletes post from user feed
userFeedRouter.delete('/:postId',(req, res, next)=>{
    console.log("test")
    const postId = req.params.postId
    UserFeed.findOne({_id:postId},(err, selectedPost)=>{
if(selectedPost.userId.toString("") !== req.auth._id){                    //permission for deleting post
    res.status(403)
    return next(new Error("You don't have permission to delete this post"))
}  
UserFeed.findOneAndDelete({_id:postId}, (err, deletedPost)=>{

if(err){
    res.status(500)
    return(next(err))
}
return res.send(`ID ${deletedPost} has been removed`)

})
})
})

//edits post from user feed
userFeedRouter.put('/:postId', (req, res, next)=>{
    const updateId = req.params.postId         
UserFeed.findOne({_id:updateId}, (err, updatedItem)=>{
    if(updatedItem.userId.toString("") !== req.auth._id){                    // permission to edit other user post
        res.status(403)
        return next(new Error("You do not have permission to modify this post"))
    }   
UserFeed.findOneAndUpdate({_id:updateId}, req.body, {new:true}, (err, updatedItem)=>{

if(err){
    res.status(500)
    return next(err)
}
return res.send(updatedItem)
})
})
})

module.exports = userFeedRouter