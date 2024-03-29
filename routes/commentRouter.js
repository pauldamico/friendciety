const express = require('express')
const Comment = require('../models/comment.js')
const commentRouter = express.Router()
const Friends = require('../models/friends.js')


//get comments
commentRouter.get('/', (req,res,next)=>{
  Friends.findOne({userId:req.auth._id}, (err, foundUser)=>{
  
const allIds = [...foundUser.friends.map(friend=>friend.id), req.auth._id]

Comment.find({userId:{$in:allIds}}, (err, foundComments)=>{

res.send(foundComments)
})

  })
})

  //add comment
  commentRouter.post('/:postId',  (req, res, next) => {
    const {comment, postOwner} = req.body
   const {username, _id} = req.auth
    const { postId} = req.params;    
    const addedComment = new Comment({postId,postOwner, comment, username, userId:_id, })    
    addedComment.save((err, newComment)=>{
      if(err){
        res.status(500)
        return next(err)
      }
return res.send(newComment)
     })
} )

  //delete Comment   does not delete the replies incase we need to archive them and for speed
  commentRouter.delete(`/:reply`, (req, res, next)=>{
    const commentId = req.params.post
    Comment.findOneAndDelete({userId:req.auth._id, _id:commentId}, (err, foundComment)=>{
      if(err){
        res.status(500)
        return next(err)
      }
    res.send(foundComment)
    })
    })

module.exports = commentRouter