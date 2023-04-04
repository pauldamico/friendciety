const express = require("express");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const Messages = require("../models/messages.js");
const messageRouter = express.Router();

//get date
function getCurrentDate(){
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();  
  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`}

//get messages
messageRouter.get(`/`, (req, res, next) => {   
  Messages.findOne({userId:req.auth._id},(err, messageInfo) => {
    if (err) {
      res.status(500);
      return next(new Error("No users have been found"));
    }
    res.status(200);         
    res.send(messageInfo);
  });
});


  //handles sending messages
  messageRouter.put(`/sendmessage`, (req, res, next) => {  
    req.body.image = req.file ? req.file.filename : null;
    Messages.findOneAndUpdate(
      { userId: req.auth._id },
      { $addToSet: {  sentMessages: {date:getCurrentDate(), message:req.body.message,from:req.auth.username, to:req.body.user, image:req.body.image}} },
      { new: true },
      (err, currentUserMessages) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        Messages.findOneAndUpdate(
          { username: req.body.user },
          { $addToSet: { receivedMessages: {date:getCurrentDate(), message:req.body.message,to:req.body.user, from:req.auth.username, image:req.body.image} } },
          { new: true },
          (err) => {
            if (err) {
              res.status(500);
              return next(err);
            }                   
            res.send(currentUserMessages);
          }
        );
      }
    );
  });
  




  module.exports = messageRouter