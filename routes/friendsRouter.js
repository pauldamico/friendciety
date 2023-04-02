const express = require("express");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const Friends = require("../models/friends.js");
const friendsRouter = express.Router();

// Sends up to date friend data
friendsRouter.get(`/friends`, (req, res, next) => {  
 
    Friends.findOne({userId:req.auth._id},(err, foundFriends) => {
      if (err) {
        res.status(500);
        return next(new Error("No users have been found"));
      }
      res.status(200);         
      res.send({friendRequest:foundFriends.friendRequest, pendingRequest:foundFriends.pendingRequest, friends:foundFriends.friends});
    });
  });
  
  //adds user to pendingfriend and   friendsrequestarray
  friendsRouter.put(`/addfriend`, (req, res, next) => {
    Friends.findOneAndUpdate(
      { userId: req.auth._id },
      { $addToSet: { pendingRequest: req.body.user } },
      { new: true },
      (err, foundUser) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        Friends.findOneAndUpdate(
          { username: req.body.user },
          { $addToSet: { friendRequest: req.auth.username } },
          { new: true },
          (err, foundFriend) => {
            if (err) {
              res.status(500);
              return next(err);
            }
            
            // console.log(req.app.get("io"))
            // req.app.get("io").emit("currentUser", foundFriend.username);
            res.send(foundUser);
          }
        );
      }
    );
  });
  
  //accepts friend request--  removes it from friendRequest array and adds it to friends array
  friendsRouter.put(`/acceptfriend`, (req, res, next) => {    
    Friends.findOne({ username: req.body.user }, (err, selectedUser) => {
  
      if (err) {
        res.status(500);
        return next(err);
      }
     
      if (!selectedUser) {
        res.status(500);
        return next(new Error("Friends not found"));
      }
      Friends.findOneAndUpdate(
        { userId: req.auth._id },
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
          Friends.findOneAndUpdate(
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
              res.send(currentUser);
            }
          );
        }
      );
    });
  });
  
  //declines friend request--  removes it from friendRequest array and pending
  friendsRouter.delete(`/declinefriend`, (req, res, next) => {
    Friends.findOneAndUpdate(
      { userId: req.auth._id },
      { $pull: { friendRequest: req.body.user } },
      { new: true },
      (err, currentUser) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        Friends.findOneAndUpdate(
          { username: req.body.user },
          { $pull: { pendingRequest: req.auth.username } },
          { new: true },
          (err, acceptedUser) => {
            if (err) {
              res.status(500);
              return next(err);
            }
            res.send(currentUser);
          }
        );
      }
    );
  });
  
  //removes friend from friends array
  friendsRouter.delete(`/removefriend`, (req, res, next) => {
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

  module.exports = friendsRouter