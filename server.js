const express = require('express')
require('dotenv').config()
const {expressjwt} = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));


app.set("io", io)



mongoose.connect("mongodb://localhost:27017/friendciety")
.then(()=>console.log("Connected to MongoDB"))
.catch(()=>console.log("Unable to connect to database"))

app.get('/',(req, res)=>{ 
res.send("Welcome")
   })


   app.use("/auth", expressjwt({ secret: process.env.SECRET, algorithms:["HS256"] }))
   app.use(require('./routes/userRouter.js'))  
   app.use('/auth/friends', require('./routes/friendsRouter.js'))  
   app.use('/auth/files', require('./routes/filesRouter.js')) 
   app.use('/auth/post', require('./routes/postRouter.js'))   
   app.use('/auth/comment', require('./routes/commentRouter.js')) 
   app.use('/auth/reply', require('./routes/replyRouter.js'))  
   // app.use('/auth/friendsfeed', require('./routes/friendsFeedRouter.js'))
   app.use('/auth/', require('./routes/userRouter.js'))
   app.use((err, req, res, next)=>{
res.send({errMsg:err.message})
   })
http.listen(9000, console.log("Server running on port 9000"))