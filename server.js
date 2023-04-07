const express = require('express')
const {instrument} = require('@socket.io/admin-ui')
const io = require("socket.io")(4000,{
cors:{
   origin:['http://localhost:3000','https://admin.socket.io/']
}
})
require('dotenv').config()
const {expressjwt} = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const http = require("http").Server(app);
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb://localhost:27017/friendciety")
.then(()=>console.log("Connected to MongoDB"))
.catch(()=>console.log("Unable to connect to database"))

//socket.io
const userIo = io.of('/user')
userIo.use((socket,next)=>{
   socket.handshake.auth.username   
   if(socket.handshake.auth.username){
      socket.username=(socket.handshake.auth.username)
   socket.join(socket.username)
   }
   else(null)
   next()
})
userIo.on('connection', socket =>{
   console.log("connected to room " + socket.username)
   socket.on('message', ({ room, msg }) => {
      console.log(`Received message from user ${socket.username} in room ${room}: ${msg}`)
      socket.to(room).emit('message', { username:socket.username, msg })  
   })
   socket.on('disconnect', () => {
      console.log(`User ${socket.username} disconnected from the server`)
   })   
})
instrument(io, {auth:false})


//middleware and routes
app.get('/auth',(req, res)=>{ 
res.send("Welcome")
   })


   app.use("/auth", expressjwt({ secret: process.env.SECRET, algorithms:["HS256"] }))
   app.use(require('./routes/userRouter.js'))     
   app.use('/auth/friends', require('./routes/friendsRouter.js'))  
   app.use('/auth/files', require('./routes/filesRouter.js')) 
   app.use('/auth/post', require('./routes/postRouter.js'))   
   app.use('/auth/comment', require('./routes/commentRouter.js')) 
   app.use('/auth/reply', require('./routes/replyRouter.js'))  
   app.use('/auth/messages', require('./routes/messageRouter.js'))  
   // app.use('/auth/friendsfeed', require('./routes/friendsFeedRouter.js'))
   app.use('/auth/', require('./routes/userRouter.js'))
   app.use((err, req, res, next)=>{
res.send({errMsg:err.message})
   })
http.listen(9000, console.log("Server running on port 9000"))