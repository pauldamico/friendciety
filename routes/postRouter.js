const express = require('express')
const multer  = require('multer')
const mkdirp = require('mkdirp')
const User = require('../models/user.js')
const Post = require('../models/post.js')
const Reply = require('../models/comment.js')
const Friends = require('../models/friends.js')
const postRouter = express.Router()

const postImages = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./uploads/${req.auth.username}/postedimages`
      mkdirp(dir).then(() => cb(null, dir)).catch(cb)
    },
    filename: (req, file, cb) => {       
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })  
  const postVideos = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./uploads/${req.auth.username}/postedvideos`
      mkdirp(dir).then(() => cb(null, dir)).catch(cb)
    },
    filename: (req, file, cb) => {      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })  
  const postVideoUpload = multer({
    storage:postVideos,
    limits: { fileSize: 50 * 1024 * 1024 }
  })
  const postImageUpload = multer({storage:postImages,
    limits: { fileSize: 5 * 1024 * 1024 }
  })

//adds post to user feed with or without images
postRouter.post('/addPost', postImageUpload.single('file'), (req, res, next)=>{

    req.body.image = req.file ? req.file.filename : null;
    req.body.username = req.auth.username
    req.body.userId = req.auth._id
    req.body.postOrder = Date.now()
    const userSavedPost = new Post(req.body)
    userSavedPost.save((err, newPost)=>{       
if(err){
    res.status(500)
    return next(err)    
}
res.send(newPost)
    })
})

//adds post to user feed with or without videos
postRouter.post('/addPost/video', postVideoUpload.single('file'), (req, res, next)=>{
  if (req.file == null) {
    // No file was uploaded
    return res.status(400).send('No file was uploaded.');
  }
  

    req.body.video = req.file ? req.file.filename : null;
    req.body.username = req.auth.username
    req.body.userId = req.auth._id
    req.body.postOrder = Date.now()
    const userSavedPost = new Post(req.body)
    userSavedPost.save((err, newPost)=>{       
if(err){
    res.status(500)
    return next(err)    
}
res.send(newPost)
    })
})

// Error handling middleware for Multer errors
postRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      if (err.fieldname === 'file') {
        return res.status(400).send(`File size exceeds the limit of ${postImageUpload.limits.fileSize} bytes for images.`);
      } else if (err.fieldname === 'video') {
        return res.status(400).send(`File size exceeds the limit of ${postVideoUpload.limits.fileSize} bytes for videos.`);
      } else {
        return res.status(400).send('File size exceeds the limit.');
      }
    } else {
      return res.status(500).send(err.message);
    }
  }
  next(err);
});


// list all posts by user
postRouter.get('/currentUserPosts', (req, res, next)=>{  
    const filterById = req.auth._id    
    Post.find({userId:{$in:[filterById]}}, (err, currentUserFeed)=>{             
    if(err){
        res.status(500)
        return next(err)
    }
    Friends.findOne({userId:filterById}, (err, currentUser)=>{
  
  const friendsArray =currentUser?.friends || []
        const filteredArray = friendsArray.map(item=>item.user)     
        Post.find({username:{$in:filteredArray}}, (err, friendsFeed)=>{    
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
//edits post from user feed
postRouter.put('/:postId', (req, res, next)=>{
  const updateId = req.params.postId         
Post.findOne({_id:updateId}, (err, updatedItem)=>{
  if(updatedItem.userId.toString("") !== req.auth._id){                    // permission to edit other user post
      res.status(403)
      return next(new Error("You do not have permission to modify this post"))
  }   
Post.findOneAndUpdate({_id:updateId}, req.body, {new:true}, (err, updatedItem)=>{

if(err){
  res.status(500)
  return next(err)
}
return res.send(updatedItem)
})
})
})

//delete post
postRouter.delete(`/:post`, (req, res, next)=>{
const postId = req.params.post
Post.findOneAndDelete({userId:req.auth._id, _id:postId}, (err, foundPost)=>{
res.send(foundPost)
})
})

//add likes
postRouter.post(`/like`, (req, res, next) => {
Post.findOne( { _id:  req.body.id }, (err, post)=>{ 
post.likes.find(user=>user===req.auth.username) && !post.dislikes.includes(req.auth.username)
? 
Post.findOneAndUpdate(          
  { _id:  req.body.id },
  { $pull: { likes: req.auth.username }, new:true},
  { new: true },
  (err, foundPost) => {           
    if (err) {
      res.status(500);
      return next(err);
    } 
    
     res.send({likes:foundPost.likes, dislikes:foundPost.dislikes});
  }
)
:
Post.findOneAndUpdate(          
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
      postRouter.post(`/dislike`, (req, res, next) => {
        Post.findOne( { _id:  req.body.id }, (err, post)=>{
          post.dislikes.find(user=>user===req.auth.username) && !post.likes.includes(req.auth.username)
          ? 
        Post.findOneAndUpdate(          
          { _id:  req.body.id },
          { $pull: { dislikes: req.auth.username }, new:true},
          { new: true },
          (err, foundPost) => {   
             
            if (err) {
              res.status(500);
              return next(err);
            }                   
            res.send({dislikes:foundPost.dislikes, likes:foundPost.likes});
          })
        :
        Post.findOneAndUpdate(          
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





module.exports = postRouter






//   //add childreply to reply
//   postRouter.post('/:commentId',  (req, res, next) => {
//     const {reply} = req.body
//    const {username, _id} = req.auth.foundUser
//     const { postId, commentId, replyId } = req.params;
//     const addedReply = new Reply({reply, username, userId:_id, commentId})
//     addedReply.save((err, newReply)=>{
// return res.send(newReply)
//      })

// } )