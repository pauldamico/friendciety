const express = require('express')
const Reply = require('../models/reply.js')
const replyRouter = express.Router()
const User = require('../models/user.js')

//get replys
replyRouter.get('/', (req,res,next)=>{
    User.findOne({_id:req.auth._id}, (err, foundUser)=>{
 if(err){
    res.status(403)
    return next(err)
 }
  Reply.find( (err, foundReplys)=>{
    if(err){
        res.status(500)
        return next(err)
     }
  res.send(foundReplys)
  })
  
    })
  })
  
    //add reply
    replyRouter.post('/:commentId',  (req, res, next) => {
      const {reply, postOwner} = req.body
     const {username, _id} = req.auth
      const {commentId} = req.params;        
      const addedReply = new Reply({commentId,postOwner, reply, username, userId:_id, })    
      addedReply.save((err, newReply)=>{
        if(err){
            res.status(500)
            return next(err)
        }
  return res.send(newReply)
       })
  } )

  //delete reply
  replyRouter.delete(`/:reply`, (req, res, next)=>{
  const replyId = req.params.post
  Reply.findOneAndDelete({userId:req.auth._id, _id:replyId}, (err, foundReply)=>{
    if(err){
      res.status(500)
      return next(err)
    }
  res.send(foundReply)
  })
  })
  

module.exports = replyRouter