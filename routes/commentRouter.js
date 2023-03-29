const express = require('express')
const Comment = require('../models/comment.js')
const commentRouter = express.Router()
const User = require('../models/user.js')


//get comments
commentRouter.get('/', (req,res,next)=>{
  User.findOne({_id:req.auth._id}, (err, foundUser)=>{
const allIds = [...foundUser.friends.map(friend=>friend.id), req.auth._id]
Comment.find({userId:{$in:allIds}}, (err, foundComments)=>{
res.send(foundComments)
})

  })
})

  //add comment
  commentRouter.post('/:postId',  (req, res, next) => {
    const {comment} = req.body
   const {username, _id} = req.auth
    const { postId} = req.params;    
    const addedComment = new Comment({postId, comment, username, userId:_id, })    
    addedComment.save((err, newComment)=>{
return res.send(newComment)
     })
} )


module.exports = commentRouter