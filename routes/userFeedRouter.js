const express = require('express')
const multer  = require('multer')
const mkdirp = require('mkdirp')
const User = require('../models/user.js')
const UserFeed = require('../models/userFeed.js')
const Reply = require('../models/comment.js')
const userFeedRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./uploads/${req.auth.username}`
      mkdirp(dir).then(() => cb(null, dir)).catch(cb)
    },
    filename: (req, file, cb) => {
        console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage })

//adds post to user feed
userFeedRouter.post('/addPost', upload.single('image'), (req, res, next)=>{
    req.body.image = req.file ? req.file.filename : null;
    req.body.username = req.auth.username
    req.body.userId = req.auth._id
    req.body.postOrder = Date.now()
    const userSavedPost = new UserFeed(req.body)
    userSavedPost.save((err, newPost)=>{
        console.log(newPost)
if(err){
    res.status(500)
    return next(err)    
}
res.send(newPost)
    })
})


// list all posts by user
userFeedRouter.get('/currentUserPosts', (req, res, next)=>{  
    const filterById = req.auth._id    
    UserFeed.find({userId:{$in:[filterById]}}, (err, currentUserFeed)=>{             
    if(err){
        res.status(500)
        return next(err)
    }
    User.findOne({_id:filterById}, (err, currentUser)=>{
  const friendsArray =currentUser?.friends || []
        const filteredArray = friendsArray.map(item=>item.id)  
        UserFeed.find({userId:{$in:filteredArray}}, (err, friendsFeed)=>{
            if(err){
                res.status(500)
                return next(err)
            }    
            const allArray = [...friendsFeed, ...currentUserFeed]
            return res.send(allArray)          
            })
    })    
    })
    })






//add likes
userFeedRouter.post(`/like`, (req, res, next) => {
UserFeed.findOne( { _id:  req.body.id }, (err, post)=>{
  console.log(post.likes.find(user=>user===req.auth.username) )
  console.log(post.dislikes.find(user=>user!==req.auth.username))
post.likes.find(user=>user===req.auth.username) && !post.dislikes.includes(req.auth.username)
? 
UserFeed.findOneAndUpdate(          
  { _id:  req.body.id },
  { $pull: { likes: req.auth.username }, new:true},
  { new: true },
  (err, foundPost) => {           
    if (err) {
      res.status(500);
      return next(err);
    } 
    console.log("test")
     res.send({likes:foundPost.likes, dislikes:foundPost.dislikes});
  }
)
:
UserFeed.findOneAndUpdate(          
  { _id:  req.body.id },
  { $addToSet: { likes: req.auth.username }, $pull:{dislikes:req.auth.username}, new:true},
  { new: true },
  (err, foundPost) => {           
    if (err) {
      res.status(500);
      return next(err);
    }                 
    res.send({likes:foundPost.likes, dislikes:foundPost.dislikes});
  })})});

//add dislike
      userFeedRouter.post(`/dislike`, (req, res, next) => {
        UserFeed.findOne( { _id:  req.body.id }, (err, post)=>{
          post.dislikes.find(user=>user===req.auth.username) && !post.likes.includes(req.auth.username)
          ? 
        UserFeed.findOneAndUpdate(          
          { _id:  req.body.id },
          { $pull: { dislikes: req.auth.username }, new:true},
          { new: true },
          (err, foundPost) => {   
            console.log(foundPost)   
            if (err) {
              res.status(500);
              return next(err);
            }                   
            res.send({dislikes:foundPost.dislikes, likes:foundPost.likes});
          })
        :
        UserFeed.findOneAndUpdate(          
          { _id:  req.body.id },
          { $addToSet: { dislikes: req.auth.username }, $pull:{likes:req.auth.username}, new:true},
          { new: true },
          (err, foundPost) => {           
            if (err) {
              res.status(500);
              return next(err);
            }        
           
            res.send({dislikes:foundPost.dislikes, likes:foundPost.likes});
          })})});

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