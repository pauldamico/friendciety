const express = require('express')
require('dotenv').config()
const {expressjwt} = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('dev'))

console.log(Date())

mongoose.connect("mongodb://localhost:27017/family-time-db", ()=>{
    console.log("Connected to Database")
})

app.get('/',(req, res)=>{ 
res.send("Welcome")
   })


   app.use(require('./routes/userRouter.js'))
   app.use("/auth", expressjwt({ secret: process.env.SECRET, algorithms:["HS256"] }))
   app.use('/auth/myfeed', require('./routes/userFeedRouter.js'))
   app.use('/auth/', require('./routes/userRouter.js'))
   app.use((err, req, res, next)=>{
res.send({errMsg:err.message})
   })
app.listen(9000, console.log("Server running on port 9000"))