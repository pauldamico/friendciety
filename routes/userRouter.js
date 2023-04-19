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
userRouter.post("/signup", async (req, res, next) => {  
console.log(req.body)
  try{
    const user = await findUserByEmail(req.body.email)
    const {email, username, password} = req.body
    if(!user){
  const newUser = await createUser(username, email, password, null)
  const fileModel = await createFilesModel(newUser)
  const friendsModel = await createFriendsModel(newUser)
  const messagesModel = await createMessagesModel(newUser)
  const token = generateToken(newUser)   
  const secret = speakeasy.generateSecret({ length: 20 });
  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.base32,
    label: newUser.withoutPassword().username,
  });
  res.send({user:newUser.withoutPassword(), token, otpauthUrl}) 
    }
    else{
    res.status(500)
      return res.send(next(new Error("Username already exists")));
    }
  }
  catch(err){
console.log(new Error('Token verification Failed', err.message))
          res.status(500)
          next(err)

  }

})     
     


//controls user login
userRouter.post("/login", (req, res, next) => { 
  User.findOne({ $or:[{username: req.body.username},{ email:req.body.username}]}, (err, foundUser) => {
    console.log(req.body)
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
userRouter.post("/auth0/auth0login", async (req, res, next) => {  
  try{
  const token = getTokenFromAuthHeader(req.headers.authorization)
  const decoded = await verifyToken(token)
  const user = await findUserByAuth0Id(decoded.sub)
  const {email, picture, nickname} = req.body
  const username = nickname
  const avatar = picture
 
  if(!user){   
            const newUser = await createAuth0User(username, email, decoded.sub, avatar)
            const fileModel = await createFilesModel(newUser)
            const friendsModel = await createFriendsModel(newUser)
            const messagesModel = await createMessagesModel(newUser)
            const token = generateToken(newUser)        
            res.send({user:newUser.withoutPassword(), token})          
        }else{     
          const token = generateToken(user);
          res.send({user, token})
        }               
      }catch(err){
          console.log(new Error('Token verification Failed', err.message))
          res.status(500)
          next(err)
        } 
            })    
  

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




function getTokenFromAuthHeader (authHeader){ 
return authHeader.split(' ')[1]
}

function verifyToken (token){
  return new Promise ((resolve, reject)=>{
  jwt.verify(token, cert, verifyOptions,(err, decoded)=>{
  if(err){
    reject(err)
  }
  else{
    resolve(decoded)
  }
  })
  })
      }  

function findUserByAuth0Id(auth0Id){
 return User.findOne({auth0Id})
 }
 function findUserByEmail(email){
  return User.findOne({email})
  }
 function createAuth0User (username, email, auth0Id, avatar){
  const newUser = new User ({username, email, auth0Id, avatar})
  return newUser.save()
}
function createUser (username, email, password, avatar){
  const newUser = new User ({username, email, password, avatar})
  return newUser.save()
}
function createFilesModel(user){
  const username = user.withoutPassword().username
  const userId = user.withoutPassword()._id
  const newFileModel = new Files ({username, userId})
  return newFileModel.save()
}

function createFriendsModel (user){
  const username = user.withoutPassword().username
  const userId = user.withoutPassword()._id
  const newFriendsModel = new Friends({
    friends:[], username, userId
  })
  return newFriendsModel.save()
}

function createMessagesModel (user){
  const username = user.withoutPassword().username
  const userId = user.withoutPassword()._id
  const newMessagesModel = new Messages({
    username, userId
  })
  return newMessagesModel.save()
}

function generateToken (user){
  const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
  return token
  }

module.exports = userRouter;