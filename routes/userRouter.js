const express = require("express");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const User = require("../models/user.js");
const Friends = require("../models/friends.js");
const Files = require("../models/files.js");
const Messages = require("../models/messages.js")
const userRouter = express.Router();
const fs = require('fs');

const cert = fs.readFileSync('./cert.cer');
const verifyOptions = {
  algorithms: ['RS256'], 
  issuer: 'https://dev-0zd4zxu226vwide7.us.auth0.com/', // The expected issuer of the token
  audience: 'friendciety', // The expected audience of the token
  clockTolerance: 30, 
  // subject: '1234567890', 
  ignoreExpiration: false, 
  key: cert,
};

//signs up user
userRouter.post("/signup", (req, res, next) => {  
  User.find({ username: req.body.username }, (err, foundUser) => {  
    if (err) {
      res.status(500);
      return next(err);
    }
    if (foundUser[0]?.username) {
      res.status(500);
      return res.send(next(new Error("Username already exists")));
    }
    req.body.username = req.body.username.toLowerCase();
    req.body.email = req.body.email.toLowerCase();
    const newSavedUser = new User(req.body);  

    
    newSavedUser.save((err, newUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      //creates secret for 2fa
      const secret = speakeasy.generateSecret({ length: 20 });
      //creates user token
      const token = jwt.sign(newUser.withoutPassword(), process.env.SECRET);
      const username = newUser.withoutPassword().username
      const userId = newUser.withoutPassword()._id
      //creates secret for 2fa
      const otpauthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: newUser.withoutPassword().username,
      });
      //creates files model for user
      if(newUser){     
        const newFilesModel = new Files({
          username, userId
        })  
          newFilesModel.save((err)=>{
            if(err){
              res.status(500)
              return next(err)
            }   
          }  )      
        //creates friendsmodel for user
        const newFriendsModel = new Friends({
          friends:[], username, userId})
          newFriendsModel.save((err, friendsList)=>{
            if(err){
              res.status(500)
              return next(err)
            }           
     // creates messages model for user
        const newMessagesModel = new Messages({
          username, userId
        })  
        newMessagesModel.save((err, messages)=>{
            if(err){
              res.status(500)
              return next(err)
            }   
            if(messages){          
              return res.send({ user: newUser.withoutPassword(), token, otpauthUrl});
            }})
          }  )    
      
      
      }        
      })
    })
    
    })
      
     


//controls user login
userRouter.post("/login", (req, res, next) => { 
  User.findOne({ $or:[{username: req.body.username},{ email:req.body.username}]}, (err, foundUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    //checks username to see if it exists
    if (!foundUser) {
      res.status(500);
      return next(new Error("Username doesn't exist"));
    }
    if (foundUser) {
      //checks the password for match (this needs to be removed)
      foundUser.checkPassword(req.body.password, (err, isMatch)=>{ 
        if(err){ 
          res.status(403) 
          return next(err)} 
          if(!isMatch){ 
            res.status(403) 
            return next(new Error("Username or Password are incorrect")) 
          }
              //creates secret for 2fa
      const secret = speakeasy.generateSecret({ length: 20 });
      //creates user token
     const token = jwt.sign(foundUser.withoutPassword() , process.env.SECRET);
     //creates qrcode url
     const otpauthUrl = speakeasy.otpauthURL({
       secret: secret.base32,
       label: foundUser.username,
     });
     return res.send({ user: foundUser.withoutPassword(), token, otpauthUrl });
        
        })
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////

//Auth 0 Login/signup
userRouter.post("/auth0/auth0login", (req, res, next) => {  
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, cert, verifyOptions, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
    } else {           
            const auth0Id = decoded.sub
            User.findOne({ auth0Id }, (err, foundUser) => {
              if (err) {
                res.status(500);
                return next(err);
              }
         
              ///
              const newSavedUser = new User({username:req.body.nickname, email:req.body.email, auth0Id, avatar:req.body.picture});  
          if(!foundUser){
            newSavedUser.save((err, newUser) => {            
              if (err) {
                res.status(500);
                return next(err);
              }       
              //creates user token
              const token = jwt.sign(newUser.withoutPassword(), process.env.SECRET);
          
                      
              //creates files model for user
              if(newUser){     
                const newFilesModel = new Files({
                  username:newUser.withoutPassword().username, userId:newUser.withoutPassword()._id
                })  
                  newFilesModel.save((err)=>{
                    if(err){
                      res.status(500)
                      return next(err)
                    }   
                  }  )      
                //creates friendsmodel for user
                const newFriendsModel = new Friends({
                  friends:[], username:newUser.username, userId:newUser._id})
                  newFriendsModel.save((err, friendsList)=>{
                    if(err){
                      res.status(500)
                      return next(err)
                    }           
             // creates messages model for user
                const newMessagesModel = new Messages({
                  username:newUser.withoutPassword().username, userId:newUser.withoutPassword()._id
                })  
                newMessagesModel.save((err, messages)=>{
                    if(err){
                      res.status(500)
                      return next(err)
                    }   
                    if(messages){          
                      return res.send({ user: newUser.withoutPassword(), token});
                    }}
                    )
                  }
                    )}       
              })
          
          }     

          if(foundUser){
            console.log(foundUser)
            const token = jwt.sign(foundUser.withoutPassword(), process.env.SECRET);
            return res.send({ user: foundUser, token});
          }

          //
            })
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////
//sends current token and user info
userRouter.get(`/currentuser`, (req, res, next) => {
  User.findOne({ _id: req.auth._id }, (err, foundUser) => {
    if (err) {
      res.status(500);
      return next(new Error("No users have been found"));
    }
    res.status(200);
    const secret = speakeasy.generateSecret({ length: 20 });
    const token = jwt.sign(foundUser.withoutPassword(), process.env.SECRET);
      //creates qrcode url
      const otpauthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: foundUser.username,
      });
      const userInfo = { user: foundUser.withoutPassword(), token: token, otpauthUrl }
  
    res.send(userInfo);
  });
});

// shows all users in database for search users function
userRouter.get(`/auth/allusers`, (req, res, next) => {

  User.find((err, foundUsers) => { 
    if (err) {
      res.status(500);
      return next(new Error("No users have been found"));
    }
    res.status(200);
    const allUsersExceptCurrentUser = foundUsers.filter(user=>user.withoutPassword().username !== req.auth.username && user.withoutPassword().username) || []
    res.send(allUsersExceptCurrentUser.map((user) => user.withoutPassword().username));
  });
});









module.exports = userRouter;