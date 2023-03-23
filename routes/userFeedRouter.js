const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const UserFeed = require('../models/userFeed.js')
const Reply = require('../models/comment.js')
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
userFeedRouter.post('/addPost', upload.single('image'), (req, res, next)=>{
    console.log(req.file)
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


  //add childreply to reply
  userFeedRouter.post('/:commentId',  (req, res, next) => {
    const {reply} = req.body
   const {username, _id} = req.auth.foundUser
    const { postId, commentId, replyId } = req.params;
    const addedReply = new Reply({reply, username, userId:_id, commentId})
    addedReply.save((err, newReply)=>{
return res.send(newReply)
     })

} )

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