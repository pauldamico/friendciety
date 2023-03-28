const express = require("express");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const User = require("../models/user.js");
const userRouter = express.Router();

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
    const newSavedUser = new User(req.body);
  
    newSavedUser.save((err, foundUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const secret = speakeasy.generateSecret({ length: 20 });
      const token = jwt.sign(foundUser.withoutPassword(), process.env.SECRET);
      const otpauthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: foundUser.username,
      });
      return res.send({ user: foundUser.withoutPassword(), token, otpauthUrl});
    });
  });
});

//controls user login
userRouter.post("/login", (req, res, next) => { 
  User.findOne({ username: req.body.username }, (err, foundUser) => {
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
          } })
          const secret = speakeasy.generateSecret({ length: 20 });
      const token = jwt.sign(foundUser.withoutPassword() , process.env.SECRET);
      const otpauthUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: foundUser.username,
      });
      return res.send({ user: foundUser.withoutPassword(), token, otpauthUrl });
    }
  });
});

//sends current token and user info
userRouter.get(`/currentuser`, (req, res, next) => {
  User.findOne({ _id: req.auth._id }, (err, foundUser) => {
    if (err) {
      res.status(500);
      return next(new Error("No users have been found"));
    }
    res.status(200);
    const token = jwt.sign(foundUser.withoutPassword(), process.env.SECRET);
   
    res.send({ user: foundUser.withoutPassword(), token: token });
  });
});

// shows all users in database for search users function
userRouter.get(`/auth/allusers`, (req, res, next) => {
  User.find((err, foundUser) => {
    if (err) {
      res.status(500);
      return next(new Error("No users have been found"));
    }
    res.status(200);
    res.send(foundUser.map((user) => user.username));
  });
});

//adds user to pendingfriend and   friendsrequestarray
userRouter.put(`/addfriend`, (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth._id },
    { $addToSet: { pendingRequest: req.body.user } },
    { new: true },
    (err, foundUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      User.findOneAndUpdate(
        { username: req.body.user },
        { $addToSet: { friendRequest: req.auth.username } },
        { new: true },
        (err, foundFriend) => {
          if (err) {
            res.status(500);
            return next(err);
          }
       
          res.send(foundFriend.username);
        }
      );
    }
  );
});

//accepts friend request--  removes it from friendRequest array and adds it to friends array
userRouter.put(`/acceptfriend`, (req, res, next) => {
  User.findOne({ username: req.body.user }, (err, selectedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
   
    if (!selectedUser) {
      res.status(500);
      return next(new Error("User not found"));
    }
    User.findOneAndUpdate(
      { _id: req.auth._id },
      {
        $addToSet: { friends: { user: req.body.user, id: selectedUser.id } },
        $pull: { friendRequest: selectedUser.username },
      },
      { new: true },
      (err, currentUser) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        User.findOneAndUpdate(
          { username: req.body.user },
          {
            $pull: { pendingRequest: req.auth.username },
            $addToSet: {
              friends: {
                user: req.auth.username,
                id: req.auth._id,
              },
            },
          },
          { new: true },
          (err, acceptedUser) => {
            if (err) {
              res.status(500);
              return next(err);
            }
            res.send({
              user: selectedUser.username,
              id: req.auth._id,
            });
          }
        );
      }
    );
  });
});

//declines friend request--  removes it from friendRequest array and pending
userRouter.delete(`/declinefriend`, (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth._id },
    { $pull: { friendRequest: req.body.user } },
    { new: true },
    (err, currentUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      User.findOneAndUpdate(
        { username: req.body.user },
        { $pull: { pendingRequest: req.auth.username } },
        { new: true },
        (err, acceptedUser) => {
          if (err) {
            res.status(500);
            return next(err);
          }
          res.send(acceptedUser.username);
        }
      );
    }
  );
});

//removes friend from friends array
userRouter.delete(`/removefriend`, (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth._id },
    { $pull: { friends: { user: req.body.user } } },
    { new: true },
    (err, currentUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      User.findOneAndUpdate(
        { username: req.body.user },
        { $pull: { friends: { user: req.auth.username } } },
        { new: true },
        (err, acceptedUser) => {
       
          if (err) {
            res.status(500);
            return next(err);
          }
          res.send(currentUser.withoutPassword());
        }
      );
    }
  );
});

module.exports = userRouter;
